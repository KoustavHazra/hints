import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    console.log(`post is there? ${post}`);
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // if post (param) has any data, then we should be able to edit it.
    // if it doesn't have any data, create a new data.
    // to do that, submit function is created.
    const submit = async (data) => {
        console.log(`data is there? ${data}`);
        if (post) {


            // if post is there, then we will upload it. So first we will upoload the new image file
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            console.log(`file is there? ${file}`);

            // now that new images is updated, we need to delete the old one
            // we can delete the old one, only if the file above is created.
            if (file) {
                service.deleteFile(post.featuredImage);
            }

            console.log(`file is actually there ${file}`);

            // now that new image is uploaded, and old image is deleted, we need to update the whole post
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
                // in update post, we have passed the post id, as slug id (check service file)
                // the other data are same, as we are only updating images here. So just spreaded the data.
                // and image is updated, we have to check if file is there, update the new image with
                // the new image file id, and if no new image file is there, then keep undefined.
                
                // -----> should be handling this undefined thing in a better way. NEED TO UPDATE.          
            });

            console.log(`dbPost is there? ${dbPost}`);

            // if post is also updated, we will navigate user to 
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }

        } else {
            // if post is not there, first we will check any new images we need to upload or not
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                console.log(`new file is there? ${file}`);

                const fileId = file.$id;  // got the new file id
                data.featuredImage = fileId;  // in data the new fileId is uploaded

                // now that we have the new image, we have to create the new post
                const dbPost = await service.createPost({
                    ...data, // spreaded the data because any time we are using any forms
                    // user data will not be availabe there. So if we spread it, user data
                    // will become available.
                    userId: userData.$id
                });
                console.log(`dbPost is there? ${dbPost}`);
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    // we have 2 input fields - title and slug.
    const slugTransform = useCallback((value) => {
        // first we will check if value is there and the typeof value
        if (value && typeof value === 'string') {
            // if we have the value, we will run these methods upon it
            // and if value isn't there, we will return an empty string.
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        } 
        return "";
    
    }, []);

    // now the slugTransform function we just created, we need to use it as well.
    useEffect(() => {
        const subscription = watch((value, {name}) => {
            // why we kept the name like {name} as an object?
            if (name === 'title') {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        });

        return () => subscription.unsubscribe();
            // this we use mostly for memory management. 
            // mostly in interview they might ask in useEffect we called a method, and as it keeps on
            // running, how do we make it optimized?
            // Answer is, we can store the method result in a variable. And in the return of useEffect
            // we get a callback function, and within that we can unsubscribe that method. So that 
            // it doesn't keep on running. So it will be like :: variableName.unsubscribe();

    }, [watch, slugTransform, setValue]);
    

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "update" : "submit"}
                </Button>
            </div>
        </form>
    );
}


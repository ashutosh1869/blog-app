import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [localPost, setLocalPost] = useState(post);
    const { slug } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: localPost?.title || "",
            slug: localPost?.$id || "",
            content: localPost?.content || "",
            status: localPost?.status || "active",
        },
    });

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (post && post !== localPost) {
            setLocalPost(post);
            reset({
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                status: post.status || "active",
            });
            setIsLoadingPost(false);
        } else if (!post && !localPost && slug) {
            setIsLoadingPost(true);
            appwriteService.getDocument(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setLocalPost(fetchedPost);
                    reset({
                        title: fetchedPost.title || "",
                        slug: fetchedPost.$id || "",
                        content: fetchedPost.content || "",
                        status: fetchedPost.status || "active",
                    });
                } else {
                    navigate("/");
                }
                setIsLoadingPost(false);
            }).catch(() => {
                navigate("/");
                setIsLoadingPost(false);
            });
        } else if (!post && !slug) {
            setIsLoadingPost(false);
            setLocalPost(null);
            reset({
                title: "",
                slug: "",
                content: "",
                status: "active",
            });
        }
    }, [post, localPost, slug, navigate, reset]);

    const submit = async (data) => {
        if (!userData?.userData?.$id) {
            alert("You must be logged in to create or update a post.");
            navigate("/login");
            return;
        }

        if (localPost) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await appwriteService.deleteFile(localPost.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(localPost.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (isLoadingPost) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-4 text-lg text-gray-700">Loading post data...</span>
            </div>
        );
    }

    return (
    <form
        onSubmit={handleSubmit(submit)}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 gap-8 border border-gray-100"
    >
        {/* Top: Title, Slug, Image */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex flex-col gap-6 flex-1">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-2 text-lg border-b-2 border-blue-300 focus:border-blue-500 transition-all"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-2 text-lg border-b-2 border-blue-300 focus:border-blue-500 transition-all"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>
            <div className="flex flex-col gap-6 items-center flex-1">
                {localPost && (
                    <div className="w-full flex justify-center">
                        <img
                            src={localPost.featuredImage ? appwriteService.getFilePreview(localPost.featuredImage) : "file not found"}
                            alt={localPost.title}
                            className="rounded-xl shadow-md border border-gray-200 max-h-48 object-cover"
                        />
                    </div>
                )}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-2 text-base border-b-2 border-blue-300 focus:border-blue-500 transition-all"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !localPost })}
                />
            </div>
        </div>
        {/* Editor */}
        <div className="mb-6">
            <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
                className="rounded-lg border border-gray-200 shadow-sm w-full"
            />
        </div>
        {/* Status & Button */}
        <div className="flex flex-col gap-6 items-center">
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-2 text-base border-b-2 border-blue-300 focus:border-blue-500 transition-all"
                {...register("status", { required: true })}
            />
            <Button
                type="submit"
                bgColor={localPost ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-blue-400 to-blue-600"}
                className="w-full py-3 text-lg font-semibold rounded-xl shadow hover:scale-105 transition-transform duration-150"
                disabled={isLoadingPost}
            >
                {localPost ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);


}
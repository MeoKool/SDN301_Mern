import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useParams } from "react-router-dom";
import submitFeedback from "./submitFeedback";

import { toast } from "../ui/use-toast";
import DeleteComment from "./deleteFeeback";

export default function Details({ data }) {
  const comments = data.comments || [];
  const idLogin = sessionStorage.getItem("id");
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const checkComments = () => {
    const hasCommented = comments.some(
      (comment) => comment.author._id === idLogin
    );
    return hasCommented;
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-6 md:gap-10 items-start">
        <img
          src="https://donghoduyanh.com/upload_images/images/2023/09/12/Top-100-anh-dong-ho-dep-1.jpg"
          alt="Elegant wristwatch"
          width={600}
          height={600}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">{data.watchName}</h1>
          <div className="flex items-center gap-4"></div>
          <div className="grid gap-4 text-balance leading-loose">
            <h3 className="text-lg font-bold">
              {data.price.toLocaleString("en-US")}VNĐ
            </h3>
            <p className="text-base">{data.watchDescription}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:gap-10 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Đánh giá</CardTitle>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (checkComments()) {
                    toast({
                      title: "Bạn chỉ được đánh giá một lần❌",
                    });
                  } else {
                    setShowModal(true);
                  }
                }}
                variant="outline"
                size="sm"
              >
                <StarIcon className="w-4 h-4 mr-2" />
                Viết đánh giá
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <div className="font-medium">
                        {comment.author.memberName}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, starIndex) => (
                          <StarIcon
                            key={starIndex}
                            className={`w-4 h-4 ${
                              starIndex < comment.rating
                                ? "fill-yellow-400 stroke-yellow-400"
                                : "fill-muted stroke-muted-foreground"
                            }`}
                          />
                        ))}
                        {comment.author._id === idLogin && (
                          <div className="ml-auto flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-transparent text-muted-foreground hover:text-primary"
                            >
                              <FilePenIcon className="w-4 h-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-transparent text-muted-foreground hover:text-destructive"
                              onClick={() =>
                                DeleteComment({
                                  idWatch: data._id,
                                  idComment: comment._id,
                                })
                              }
                            >
                              <TrashIcon className="w-4 h-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-loose">{comment.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-4">Hiện tại chưa có đánh giá</div>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-6 h-6 ${
                    index < rating
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "fill-muted stroke-muted-foreground"
                  }`}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <Textarea
              placeholder="Viết đánh giá của bạn"
              className="w-full px-4 py-2 text-sm bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={content}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await submitFeedback({
                  userId: idLogin,
                  watchId: data._id,
                  rating: rating,
                  content: content,
                });
                setShowModal(false);
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

const CardContent = [
  {
    title: "Generate Your Roadmap?",
    description:
      "This will create a personalized learning roadmap based on your skills and goals.Do you want to generate a roadmap.",
    buttonText: "Yes,Continue ✨",
    cancelText: "Cancel",
  },
  {
    title: "Open QnA Chat Bot?",
    description:
      "This will open an interactive chat bot to answer your questions using AI technology. Do you want to proceed.",
    buttonText: "Yes,Open Chat Bot 💬",
    cancelText: "Cancel",
  },
];
export default function DialogBox({ tool }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 mt-2 rounded-xl hover:opacity-90 transition">
          {tool.button}
        </Button>
      </DialogTrigger>
      {CardContent.map((content, index) => {
        if (
          (tool.button === "Generate Roadmap" && index === 0) ||
          (tool.button === "Open Chat Bot" && index === 1)
        ) {
          return (
            <DialogContent className="sm:max-w-md" key={index}>
              <DialogHeader>
                <DialogTitle>{content.title}</DialogTitle>
                <DialogDescription>{content.description}</DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-3">
                <Button variant="outline">{content.cancelText}</Button>
                {tool.button === "Generate Roadmap" ? (
                  <Link to="/admin/roadmap">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-500 text-white hover:opacity-90 transition">
                      {content.buttonText}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/admin/qna-chatbot">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-500 text-white hover:opacity-90 transition">
                      {content.buttonText}
                    </Button>
                  </Link>
                )}
              </DialogFooter>
            </DialogContent>
          );
        }
      })}
    </Dialog>
  );
}

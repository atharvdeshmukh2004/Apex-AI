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


export default function RoadmapGeneratorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 mt-2 rounded-xl hover:opacity-90 transition">
          Generate Roadmap
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Your Roadmap?</DialogTitle>
          <DialogDescription>
            This will create a personalized learning roadmap based on your
            skills and goals.Do you want to generate a roadmap.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Link to="/admin/roadmap">
            <Button className="bg-gradient-to-r from-green-600 to-blue-500 text-white hover:opacity-90 transition">
              Yes,Continue ✨
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

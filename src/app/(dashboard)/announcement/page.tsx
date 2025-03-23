"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { postAnnouncement } from "@/app/action";

const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bulletPoints, setBulletPoints] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddBulletPoint = () => {
    setBulletPoints([...bulletPoints, ""]);
  };

  const handleBulletPointChange = (index: number, value: string) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index] = value;
    setBulletPoints(updatedBulletPoints);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const announcementData = { title, content, bulletPoints: bulletPoints.filter(bp => bp.trim()) };
      const response = await postAnnouncement(announcementData);
      if (response.error) {
        toast({ title: "Error", description: response.error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Announcement posted successfully!" });
        setTitle("");
        setContent("");
        setBulletPoints([""]);
      }
    } catch (error:any) {
      toast({ title: "Error", description: "Failed to post the announcement.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4 text-purple-700">
        Post Announcement
      </h2>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
        <h3 className="font-semibold">Bullet Points</h3>
        {bulletPoints.map((point, index) => (
          <Input
            key={index}
            placeholder={`Point ${index + 1}`}
            value={point}
            onChange={(e) => handleBulletPointChange(index, e.target.value)}
            className="mb-2"
          />
        ))}
        <Button variant="ghost" onClick={handleAddBulletPoint}>
          + Add Point
        </Button>
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post Announcement"}
      </Button>
    </div>
  );
};

export default AnnouncementForm;

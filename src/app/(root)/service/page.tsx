"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnnouncements } from "@/app/action";
import { useRouter } from "next/navigation";

const AnnouncementList = () => {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const user = JSON.parse(localStorage.getItem("user") || "{}");
     if (!user?._id) {
       router.push("/login");
       return;
     }
    const fetchAnnouncements = async () => {
      const response = await getAnnouncements();
      if (response.error) {
        console.error(response.error);
      } else {
        setAnnouncements(response);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, [router]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-24 mb-4 rounded-lg" />
        ))
      ) : announcements.length > 0 ? (
        announcements.map((announcement) => (
          <Card key={announcement._id} className="mb-4">
            <CardHeader>
              <CardTitle>{announcement.title}</CardTitle>
              <CardDescription>{new Date(announcement.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
              {announcement.bulletPoints && announcement.bulletPoints.length > 0 && (
                <ul className="mt-4 list-disc pl-5">
                  {announcement.bulletPoints.map((point:string, index:string) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default AnnouncementList;

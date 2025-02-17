"use client"
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getProfile } from "@/app/action";

interface StudentProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  mailingAddress: string;
  departmentOfStudy: string;
}

const ProfilePage: React.FC = () => {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentProfile | null>(null);

  // Fetch the student profile data (example: from API or localStorage)
  useEffect(() => {
    // Replace with your API call or localStorage retrieval
    const fetchProfile = async () => {
     
      const data: StudentProfile = await getProfile()
      console.log(data);
      
      setStudent(data);
      setFormData(data);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Save updated profile data to API
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData: StudentProfile = await response.json();
        setStudent(updatedData);
        setIsEditing(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Student Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData?.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData?.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData?.phoneNumber || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="mailingAddress">Mailing Address</Label>
                <Input
                  id="mailingAddress"
                  name="mailingAddress"
                  value={formData?.mailingAddress || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="departmentOfStudy">Department</Label>
                <Input
                  id="departmentOfStudy"
                  name="departmentOfStudy"
                  value={formData?.departmentOfStudy || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>First Name:</strong> {student?.firstName}</p>
              <p><strong>Last Name:</strong> {student?.lastName}</p>
              <p><strong>Email:</strong> {student?.email}</p>
              <p><strong>Phone Number:</strong> {student?.phoneNumber}</p>
              <p><strong>Mailing Address:</strong> {student?.mailingAddress}</p>
              <p><strong>Department:</strong> {student?.departmentOfStudy}</p>
            </div>
          )}

          <div className="mt-4 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
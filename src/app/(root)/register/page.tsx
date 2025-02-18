"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Correct imports
import { useState } from "react";
import { register } from "@/app/action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type Props = {};

interface Student {
  indexNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  mailingAddress: string;
  gender: "Male" | "Female" | "Other";
  yearOfStudy: "1st Year" | "2nd Year" | "3rd Year" | "4th Year" | "Other";
  departmentOfStudy: string;
  academicAdvisor: string;
  password: string;
  role?: "Student" | "admin" | "Staff";
}

const Page = (props: Props) => {
  const [formData, setFormData] = useState<Student>({
    indexNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    mailingAddress: "",
    gender: "Male",
    yearOfStudy: "1st Year",
    departmentOfStudy: "",
    academicAdvisor: "",
    password: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      if (data.user) {
        localStorage.setItem("user",JSON.stringify(data.user));
        toast({
          title: "Registration Successful",
        });
        router.push("/");
        setTimeout(() => {
          
          window.location.reload()
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: data.error,
        });
      }
    } catch (err: any) {
      console.log("error:", err);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Create your account by filling out the form below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="indexNumber">Index Number</Label>
                    <Input
                      id="indexNumber"
                      type="text"
                      required
                      value={formData.indexNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, indexNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@stu.cmb.ac.lk"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mailingAddress">Mailing Address</Label>
                    <Input
                      id="mailingAddress"
                      type="text"
                      required
                      value={formData.mailingAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mailingAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: "Male" | "Female" | "Other") =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="yearOfStudy">Year of Study</Label>
                    <Select
                      value={formData.yearOfStudy}
                      onValueChange={(value: "1st Year" | "2nd Year" | "3rd Year" | "4th Year" | "Other") =>
                        setFormData({ ...formData, yearOfStudy: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="departmentOfStudy">Department of Study</Label>
                    <Input
                      id="departmentOfStudy"
                      type="text"
                      required
                      value={formData.departmentOfStudy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          departmentOfStudy: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="academicAdvisor">Academic Advisor</Label>
                    <Input
                      id="academicAdvisor"
                      type="text"
                      required
                      value={formData.academicAdvisor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academicAdvisor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;

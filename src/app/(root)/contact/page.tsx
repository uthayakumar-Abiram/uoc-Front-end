"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { contact } from "@/app/action";

const Contact = () => {
  const [formData, setFormData] = useState({ question: "", description: "" });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the privacy policy.");
      return;
    }

    try {
      const response = await contact(formData);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ question: "", description: "" });
        setAgreed(false);
      }
    } catch (err:any) {
      setError("An error occurred while sending your message. Please try again later.");
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Contact AskTech
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          As soon as admin notice your question, you will get your solution.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="question" className="block text-sm font-semibold text-gray-900">
              Question
            </Label>
            <Input
              id="question"
              name="question"
              type="text"
              autoComplete="organization"
              value={formData.question}
              onChange={handleChange}
              className="mt-2.5"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="description" className="block text-sm font-semibold text-gray-900">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-2.5"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-4">
          <Switch
            id="agreement"
            checked={agreed}
            onCheckedChange={setAgreed}
          />
          <Label htmlFor="agreement" className="text-sm text-gray-600">
            By selecting this, you agree to our{" "}
            <a href="#" className="font-semibold text-indigo-600">
              privacy&nbsp;policy
            </a>
            .
          </Label>
        </div>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
        <div className="mt-10">
          <Button type="submit" className="w-full">
           Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;

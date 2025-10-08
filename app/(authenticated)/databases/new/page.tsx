"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createDbAction } from "@/actions/databases";
import { z } from "zod";
import { startTransition, useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .regex(/^[a-z0-9_-]+$/, { message: "Invalid format" }),
});

export default function () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [state, action, pending] = useActionState(createDbAction, undefined);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      action(values);
    });
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-4xl my-4">Databases</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="my-awesome-database"
                    {...field}
                    pattern="^[a-zA-Z0-9-_]*$"
                  />
                </FormControl>
                <FormDescription>Alphanumeric</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={pending}>
            <Save />
          </Button>
        </form>
      </Form>
      {state?.error && <div className="my-4 text-center">{state?.error}</div>}
    </>
  );
}

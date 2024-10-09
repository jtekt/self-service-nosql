import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { env } from "next-runtime-env"
import { getDatabaseCache } from "@/actions/databases"

export default async function DatabasePage({
  params,
}: {
  params: { name: string }
}) {
  const NEXT_PUBLIC_MONGODB_CONNECTION_STRING = env(
    "NEXT_PUBLIC_MONGODB_CONNECTION_STRING"
  )

  const database = await getDatabaseCache(params.name)

  const fields = [
    {
      label: "Database",
      value: database.db,
    },
    {
      label: "User",
      value: database.username,
    },
  ]

  if (NEXT_PUBLIC_MONGODB_CONNECTION_STRING) {
    const insertIndex = NEXT_PUBLIC_MONGODB_CONNECTION_STRING.indexOf("://") + 3
    const formattedString =
      NEXT_PUBLIC_MONGODB_CONNECTION_STRING.slice(0, insertIndex) +
      `${database.username}:<password>@` +
      NEXT_PUBLIC_MONGODB_CONNECTION_STRING.slice(insertIndex)

    fields.push({
      label: "Connection string",
      value: formattedString,
    })
  }

  return (
    <>
      <div className="mt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {database ? database.db : "Database"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between my-4 ">
          <h2 className="text-3xl">{database ? database.db : "Database"}</h2>
        </div>

        <dl className="divide-y">
          {fields.map((field) => (
            <div className="px-1 py-2 grid grid-cols-4 gap-2" key={field.label}>
              <dt className="text-sm font-medium leading-6">{field.label}</dt>
              <dd className="mt-1 text-sm col-span-3 ">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

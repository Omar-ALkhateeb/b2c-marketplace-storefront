import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowUpIcon } from "@/icons"
import { Metadata } from "next"
import { translations } from "@/lib/translations"

export const metadata: Metadata = {
  title: "404",
  description: translations.errors.somethingWentWrong,
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-24">
      <h1 className="text-2xl-semi text-ui-fg-base">{translations.errors.pageNotFound}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {translations.errors.pageNotFoundDescription}
      </p>
      <LocalizedClientLink className="flex gap-x-1 items-center group" href="/">
        {translations.errors.goToFrontpage}
        <ArrowUpIcon
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--fg-interactive)"
        />
      </LocalizedClientLink>
    </div>
  )
}

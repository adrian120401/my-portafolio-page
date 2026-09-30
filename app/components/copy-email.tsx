"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { getDictionary, contact, type Locale } from "@/util/i18n";
export function CopyEmail({ locale }: { locale: Locale }) {
	const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
	const d = getDictionary(locale).contact;
	async function copy() {
		try {
			await navigator.clipboard.writeText(contact.email);
			setStatus("copied");
		} catch {
			setStatus("error");
		}
	}
	return (
		<div className="copy-email">
			<button type="button" className="text-link" onClick={copy}>
				{status === "copied" ? (
					<Check size={16} aria-hidden="true" />
				) : (
					<Copy size={16} aria-hidden="true" />
				)}
				{status === "copied" ? d.copied : d.copy}
			</button>
			<span role="status">{status === "error" ? d.copyError : ""}</span>
		</div>
	);
}

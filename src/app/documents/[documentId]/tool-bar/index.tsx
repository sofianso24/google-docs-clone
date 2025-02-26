"use client"

import {
    BoldIcon,
    ItalicIcon,
    ListTodoIcon,
    LucideIcon,
    MessageSquarePlus,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon
} from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { FontFamilyButton } from "./components/font-family-button";
import { HeadingLevelButton } from "./components/heading-level-button";
import { TextColorButton } from "./components/text-color-button";
import { HighlightColorButton } from "./components/highlight-color-button";
import { LinkButton } from "./components/link-button";
import { ImageButton } from "./components/image-button";
import { AlignButton } from "./components/align-button";
import { ListButton } from "./components/list-button";
import { FontSizeButton } from "./components/font-size-button";
import { LineHeightButton } from "./components/line-height-button";

interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const ToolBarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolBarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-[#d3e3fd]",
                isActive && "bg-[#d3e3fd]"
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}

export const ToolBar = () => {

    const { editor } = useEditorStore();
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {

                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                },
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
            ],
            [
                {
                    label: "Comments",
                    icon: MessageSquarePlus,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("livelocksCommentBlocks")
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive("taskList"),
                    onClick: () => editor?.chain().focus().toggleTaskList().run()
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()
                },
            ],
        ];
    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 mx-3 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolBarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontSizeButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolBarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighlightColorButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            <LineHeightButton />
            <ListButton />
            {sections[2].map((item) => (
                <ToolBarButton key={item.label} {...item} />
            ))}
        </div>
    )
}
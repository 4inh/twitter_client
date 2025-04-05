import { Friend } from "@/types/auth";
import {
    ChangeEvent,
    KeyboardEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

interface AutoGrowTextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    minHeight?: number;
    maxHeight?: number;
    className?: string;
    placeholder?: string;
    users?: Friend[]; // List of users for @ mentions
}

const AutoGrowTextArea: React.FC<AutoGrowTextAreaProps> = ({
    value = "",
    onChange,
    minHeight = 40,
    maxHeight = 400,
    className = "",
    placeholder = "",
    users = [],
    ...props
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string>(value);
    const [displayElement, setDisplayElement] = useState<ReactNode>(null);

    // For mention suggestions
    const [mentionQuery, setMentionQuery] = useState<string>("");
    const [showMentionSuggestions, setShowMentionSuggestions] =
        useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = useState<Friend[]>([]);

    const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);

    // When value prop changes, update content
    useEffect(() => {
        setContent(value);
    }, [value]);

    // Adjust height on initial render and when content changes
    useEffect(() => {
        const adjustHeight = (): void => {
            const textArea = textAreaRef.current;
            if (!textArea) return;

            // Reset height to auto to get the correct scrollHeight
            textArea.style.height = "auto";

            // Calculate new height (clamped between min and max)
            const newHeight = Math.max(
                minHeight,
                Math.min(textArea.scrollHeight, maxHeight)
            );

            // Set the new height
            textArea.style.height = `${newHeight}px`;

            // Show/hide scrollbar based on content height
            textArea.style.overflowY =
                textArea.scrollHeight > maxHeight ? "auto" : "hidden";
        };

        adjustHeight();

        // Process the content to highlight mentions and hashtags
        processHighlighting();
    }, [content, minHeight, maxHeight]);

    // Filter users when mentionQuery changes
    useEffect(() => {
        if (mentionQuery) {
            const filtered = users.filter((user) =>
                user.username.toLowerCase().includes(mentionQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
            setSelectedUserIndex(0); // Reset selection to first item
        }
    }, [mentionQuery, users]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const newContent = e.target.value;
        setContent(newContent);

        // Check if we're in the process of entering a mention
        const cursorPosition = e.target.selectionStart;
        const textBeforeCursor = newContent.substring(0, cursorPosition);

        // Find the last @ symbol before cursor
        const lastAtSymbolIndex = textBeforeCursor.lastIndexOf("@");

        if (lastAtSymbolIndex !== -1) {
            // Check if there's a space between the last @ and cursor
            const textBetweenAtAndCursor = textBeforeCursor.substring(
                lastAtSymbolIndex + 1
            );

            if (!textBetweenAtAndCursor.includes(" ")) {
                // We're in a mention, update the query
                setMentionQuery(textBetweenAtAndCursor);
                setShowMentionSuggestions(true);
                // calculateCaretPosition(cursorPosition);
            } else {
                // Not in a mention anymore
                setShowMentionSuggestions(false);
            }
        } else {
            // No @ found before cursor
            setShowMentionSuggestions(false);
        }

        if (onChange) {
            onChange(e);
        }
    };

    // Function to process and highlight mentions and hashtags
    const processHighlighting = (): void => {
        if (!content) {
            setDisplayElement(null);
            return;
        }

        // Split content by mentions and hashtags
        // This regex matches @word or #word patterns (word = letters, numbers, underscores)
        const parts: string[] = content.split(
            /(\s@[\w]+|\s#[\w]+|^@[\w]+|^#[\w]+)/g
        );

        const highlightedContent = parts.map((part, index) => {
            // Check if the part is a mention (@)
            if (part.trim().startsWith("@")) {
                return (
                    <span key={index}>
                        <span style={{ color: "blue", fontWeight: 600 }}>
                            {part}
                        </span>
                    </span>
                );
            }
            // Check if the part is a hashtag (#)
            else if (part.trim().startsWith("#")) {
                return (
                    <span key={index}>
                        <span style={{ color: "black", fontWeight: 600 }}>
                            {part}
                        </span>
                    </span>
                );
            }
            // Regular text
            return <span key={index}>{part}</span>;
        });

        setDisplayElement(highlightedContent);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (showMentionSuggestions && filteredUsers.length > 0) {
            // Handle navigation with arrow keys
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedUserIndex(
                    (prev) => (prev + 1) % filteredUsers.length
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedUserIndex(
                    (prev) =>
                        (prev - 1 + filteredUsers.length) % filteredUsers.length
                );
            } else if (e.key === "Enter" || e.key === "Tab") {
                // Select the currently highlighted user
                e.preventDefault();
                insertMention(filteredUsers[selectedUserIndex]);
            } else if (e.key === "Escape") {
                e.preventDefault();
                setShowMentionSuggestions(false);
            }
        }

        // Pass the keydown event to any provided handler
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    };

    const insertMention = (user: Friend): void => {
        if (!textAreaRef.current) return;

        const textarea = textAreaRef.current;
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = content.substring(0, cursorPosition);

        // Find the starting position of the current mention (last @ before cursor)
        const lastAtSymbolIndex = textBeforeCursor.lastIndexOf("@");

        if (lastAtSymbolIndex !== -1) {
            // Create new content with the mention inserted
            const newContent =
                content.substring(0, lastAtSymbolIndex) +
                `@${user.username} ` +
                content.substring(cursorPosition);

            setContent(newContent);

            // Trigger onChange with the new value
            if (onChange && textAreaRef.current) {
                const newEvent = {
                    target: {
                        ...textAreaRef.current,
                        value: newContent,
                    },
                } as ChangeEvent<HTMLTextAreaElement>;

                onChange(newEvent);
            }

            // Hide suggestions
            setShowMentionSuggestions(false);

            // Focus at the end of the inserted mention
            setTimeout(() => {
                if (textAreaRef.current) {
                    const newCursorPosition =
                        lastAtSymbolIndex + user.username.length + 2; // +2 for @ and space
                    textAreaRef.current.focus();
                    textAreaRef.current.setSelectionRange(
                        newCursorPosition,
                        newCursorPosition
                    );
                }
            }, 0);
        }
    };

    return (
        <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
            <textarea
                ref={textAreaRef}
                value={content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{
                    minHeight: `${minHeight}px`,
                    maxHeight: `${maxHeight}px`,
                    resize: "none",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    width: "100%",
                    backgroundColor: "transparent",
                    position: "relative",
                    zIndex: 2,
                    color: "transparent",
                    caretColor: "black", // Makes the cursor visible
                    outline: "none",
                }}
                className={className}
                placeholder={placeholder}
                {...props}
            />

            {/* Overlay div to show highlighted text */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: textAreaRef.current
                        ? window.getComputedStyle(textAreaRef.current).padding
                        : "8px",
                    fontFamily: textAreaRef.current
                        ? window.getComputedStyle(textAreaRef.current)
                              .fontFamily
                        : "inherit",
                    fontSize: textAreaRef.current
                        ? window.getComputedStyle(textAreaRef.current).fontSize
                        : "inherit",
                    lineHeight: textAreaRef.current
                        ? window.getComputedStyle(textAreaRef.current)
                              .lineHeight
                        : "inherit",
                    pointerEvents: "none",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    zIndex: 1,
                }}
            >
                {displayElement ||
                    (content
                        ? content
                        : placeholder && (
                              <span style={{ opacity: 0.6 }}>
                                  {placeholder}
                              </span>
                          ))}
            </div>

            {/* Mention suggestions popup */}
            {showMentionSuggestions && filteredUsers.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: `100%`,
                        left: `0px`,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        zIndex: 3,
                        maxHeight: "200px",
                        overflow: "auto",
                        width: "250px",
                    }}
                >
                    {filteredUsers.map((user, index) => (
                        <div
                            key={user._id}
                            onClick={() => insertMention(user)}
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                backgroundColor:
                                    index === selectedUserIndex
                                        ? "#f0f0f0"
                                        : "transparent",
                                display: "flex",
                                alignItems: "center",
                            }}
                            onMouseEnter={() => setSelectedUserIndex(index)}
                        >
                            {user.profilePicture && (
                                <div
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        marginRight: "8px",
                                        backgroundImage: `url(${user.profilePicture})`,
                                        backgroundSize: "cover",
                                    }}
                                />
                            )}
                            <div>
                                <div style={{ fontWeight: "bold" }}>
                                    {user.username}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.8em",
                                        color: "#666",
                                    }}
                                >
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AutoGrowTextArea;

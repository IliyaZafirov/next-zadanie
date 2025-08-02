import { forwardRef } from "react";

type MessageProps = {
  message: string;
  success: boolean;
  className?: string;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, success, className }, ref) => {
    return (
      <>
        {message && (
          <div
            ref={ref}
  
            className={`px-[3vw] my-[1vh] md:my-[-0.1vh] ${
              className ? className : ""
            } ${
              success ? "text-green-600" : "text-red-600"
            } text-xs md:text-sm`}
          >
            {success ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {message}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {message}
              </>
            )}
          </div>
        )}
      </>
    );
  }
);

Message.displayName = "Message";

export default Message;

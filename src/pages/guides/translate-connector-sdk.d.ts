/********************************************************************************
 * MIT License

 * © Copyright 2026 Adobe. All rights reserved.

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************************************************************/

/**
 * Error codes for the translation service.
 * @public
 */
export declare enum ErrorCode {
    /**
     * The request is invalid.
     */
    BAD_REQUEST = "BadRequest",
    /**
     * The request is unauthorized.
     */
    UNAUTHORIZED = "Unauthorized",
    /**
     * A generic error occurred.
     */
    GENERIC_ERROR = "GenericError"
}

/**
 * Reasons for negative feedback.
 * @public
 */
export declare enum FeedbackNegativeReason {
    /**
     * The content contains harmful stereotypes or bias.
     */
    HARMFUL_OR_BIAS_CONTENT = "HarmfulOrBiasContent",
    /**
     * The content violates copyright or trademark.
     */
    COPYRIGHT_TRADEMARK_VIOLATION = "CopyrightTrademarkViolation",
    /**
     * The content contains nudity or sexual content.
     */
    NUDITY_OR_SEXUAL_CONTENT = "NudityOrSexualContent",
    /**
     * The content contains violence or gore.
     */
    VIOLENCE_OR_GORE = "ViolenceOrGore",
    /**
     * The translation contains errors.
     */
    TRANSLATION_ERROR = "TranslationError",
    /**
     * The tone of voice was incorrect.
     */
    INCORRECT_TONE = "IncorrectTone",
    /**
     * The layout and/or formatting were incorrect.
     */
    INCORRECT_LAYOUT = "IncorrectLayout",
    /**
     * The translation took a long time to load.
     */
    LONG_LOAD_TIME = "LongLoadTime",
    /**
     * Other reason.
     */
    OTHER = "Other"
}

/**
 * Reasons for positive feedback.
 * @public
 */
export declare enum FeedbackPositiveReason {
    /**
     * The translation was accurate.
     */
    ACCURATE_TRANSLATION = "AccurateTranslation",
    /**
     * The tone of voice was correct.
     */
    CORRECT_TONE = "CorrectTone",
    /**
     * The layout and/or formatting were preserved.
     */
    PRESERVED_LAYOUT = "PreservedLayout",
    /**
     * The translation loaded quickly.
     */
    QUICK_LOAD = "QuickLoad",
    /**
     * The result exceeded expectations.
     */
    IMPRESSIVE = "Impressive",
    /**
     * Other reason.
     */
    OTHER = "Other"
}

/**
 * The reason for the feedback.
 * @public
 */
export declare type FeedbackReason = FeedbackPositiveReason | FeedbackNegativeReason;

/**
 * Request structure for submitting feedback.
 * @public
 */
export declare interface FeedbackRequest {
    /**
     * The feedback type.
     */
    readonly type: FeedbackType;
    /**
     * The reason for the feedback.
     */
    readonly reason: FeedbackReason;
    /**
     * Additional note about the feedback, if any.
     */
    readonly note?: string;
}

/**
 * Response structure for submitting feedback.
 * @public
 */
export declare interface FeedbackResponse {
    /**
     * (Optional) The error code of the response.
     */
    readonly errorCode?: ErrorCode;
    /**
     * (Optional) The error message of the response.
     */
    readonly errorMessage?: string;
}

/**
 * The type of feedback.
 * @public
 */
export declare enum FeedbackType {
    POSITIVE = "Positive",
    NEGATIVE = "Negative"
}

/**
 * The response schema for the health API.
 * @public
 */
export declare interface HealthResponse {
    /**
     * (Optional) Message providing additional details about the health status.
     */
    readonly message?: string;
    /**
     * (Optional) The error code of the response.
     */
    readonly errorCode?: ErrorCode;
    /**
     * (Optional) The error message of the response.
     */
    readonly errorMessage?: string;
}

/**
 * Represents a locale supported by the translation service.
 * @public
 */
export declare interface Locale {
    /**
     * The IETF language tag for the locale (e.g. "en-US", "fr-FR").
     */
    readonly code: string;
    /**
     * The human-readable label for the locale.
     */
    readonly label: string;
    /**
     * Locale category (e.g. "Popular languages", "Other languages").
     */
    readonly category?: string;
}

/**
 * Response structure for fetching supported locales.
 * @public
 */
export declare interface LocalesResponse {
    /**
     * The list of supported locales.
     */
    readonly locales: Locale[];
    /**
     * (Optional) The error code of the response.
     */
    readonly errorCode?: ErrorCode;
    /**
     * (Optional) The error message of the response.
     */
    readonly errorMessage?: string;
}

/**
 * Represents a tone supported by the translation service.
 * @public
 */
export declare interface Tone {
    /**
     * The value of the tone (e.g. "Formal", "Informal").
     */
    readonly value: string;
    /**
     * Label for the tone.
     */
    readonly label: string;
}

/**
 * Response structure for fetching supported tones.
 * @public
 */
export declare interface TonesResponse {
    /**
     * The list of supported tones.
     */
    readonly tones: Tone[];
    /**
     * (Optional) The error code of the response.
     */
    readonly errorCode?: ErrorCode;
    /**
     * (Optional) The error message of the response.
     */
    readonly errorMessage?: string;
}

/**
 * Error codes for the translation response.
 * @public
 */
export declare type TranslateErrorCode = TranslateResponseErrorCode | ErrorCode;

/**
 * Error codes for the translation response.
 * These map to specific UI behaviors in Adobe Express.
 * @public
 */
export declare enum TranslateResponseErrorCode {
    /**
     * Unsupported locale.
     */
    UNSUPPORTED_LOCALE = "UnsupportedLocale",
    /**
     * The source and target locale are the same.
     */
    SOURCE_TARGET_LOCALE_SAME = "SourceTargetLocaleSame",
    /**
     * The source content is unsafe.
     */
    UNSAFE_SOURCE_CONTENT_DETECTED = "UnsafeSourceContentDetected",
    /**
     * The input token limit exceeded.
     */
    INPUT_TOKEN_LIMIT_EXCEEDED = "InputTokenLimitExceeded",
    /**
     * The service is currently overloaded.
     */
    SERVICE_CAPACITY = "ServiceCapacity",
    /**
     * The request is too large.
     */
    MAX_SIZE_EXCEEDED = "MaxSizeExceeded"
}

/**
 * Payload for a translation request.
 * @public
 */
export declare interface TranslationRequest {
    /**
     * The source locale code.
     */
    readonly sourceLocale: Locale["code"];
    /**
     * The target locale code to translate into.
     */
    readonly targetLocale: Locale["code"];
    /**
     * List of items containing messages to translate.
     */
    readonly items: string[];
    /**
     * The tone of the translation.
     */
    readonly tone?: string;
}

/**
 * Response from the translation service.
 * @public
 */
export declare interface TranslationResponse {
    /**
     * List of translation result, keyed by locale code.
     */
    readonly result: string[];
    /***
     * (Optional) The error code of the response.
     */
    readonly errorCode?: TranslateErrorCode;
    /**
     * (Optional) The error message of the response.
     */
    readonly errorMessage?: string;
}

export {};

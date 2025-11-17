/**
 * API SWITCH UTILITY
 *
 * This utility helps you toggle between real API calls and dummy data.
 *
 * TO USE DUMMY DATA:
 * 1. Set USE_DUMMY_DATA=true in your .env.local file
 * 2. Restart your development server
 *
 * TO SWITCH BACK TO REAL API:
 * 1. Set USE_DUMMY_DATA=false in your .env.local file (or remove the variable)
 * 2. Restart your development server
 */

export const USE_DUMMY_DATA = process.env.USE_DUMMY_DATA === "true"

/**
 * Wraps an API call to return dummy data if USE_DUMMY_DATA is enabled
 *
 * @param apiCall - The actual API function to call
 * @param dummyData - The dummy data to return when in dummy mode
 * @returns Promise with either real or dummy data
 *
 * @example
 * ```ts
 * export async function getProducts() {
 *   return withDummyData(
 *     () => sdk.client.fetch('/store/products'),
 *     dummyData.products
 *   )
 * }
 * ```
 */
export async function withDummyData<T>(
  apiCall: () => Promise<T>,
  dummyData: T
): Promise<T> {
  if (USE_DUMMY_DATA) {
    console.log("🎭 Using dummy data (API calls disabled)")
    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 300))
    return dummyData
  }

  try {
    return await apiCall()
  } catch (error) {
    console.error("❌ API call failed:", error)
    throw error
  }
}

/**
 * Synchronous version for non-async operations
 */
export function withDummyDataSync<T>(realData: T | null | undefined, dummyData: T): T {
  if (USE_DUMMY_DATA) {
    return dummyData
  }
  return realData ?? dummyData
}

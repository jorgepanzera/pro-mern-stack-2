import { jsonDateReviver } from "./DateHandler"

function IsFormFieldElement(
    element: Element
): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
    // Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    if (!('value' in element)) {
        throw new Error(`Element is not a form field element`)
    }
}

async function request<TResponse>(request_url: string, config: RequestInit): Promise<TResponse> {
    const response = await fetch(request_url, config)

    const body = await response.text()
    const result = JSON.parse(body, jsonDateReviver)
    return result
}
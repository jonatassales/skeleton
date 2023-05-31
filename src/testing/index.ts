import { queryByAttribute, render } from '@testing-library/react'

/**
 * This is a convenience type for referring to the result of calling `render`.
 */
export type Dom = ReturnType<typeof render>

// FIXME(mroberts): We should use something like `screen.getByPlaceholderText` instead.
/**
 * This function allows getting elements by ID.
 *
 * Actually, we should avoid using this. testing-library encourages you to
 * interact with the DOM like a user would, and that means selecting things
 * based on placeholder text, role, etc. So, if we find ourselves using this a
 * lot, probably we need to go back and consider the DOM tree we are building.
 *
 * @param dom the {@link Dom} to query
 * @param id the ID of the element to query
 */
export const getById = (dom: Dom, id: string) => queryByAttribute('id', dom.container, id)!

export * from './CommonProviders'

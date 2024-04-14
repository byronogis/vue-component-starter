/**
 * The props for the MyComponent component
 */
export interface MyComponentProps {
  /**
   * The message to display (props)
   * @default 'Hello, World!'
   */
  msg?: string
}

/**
 * The emits for the MyComponent component
 */
export interface MyComponentEmits {
  /**
   * Emitted when the component is clicked
   */
  (e: 'click', msg: string): void
}

/**
 * The slots for the MyComponent component
 */
export interface MyComponentSlots {
  /**
   * The content to display
   * @description The content to display
   */
  default: (props: {
    /**
     * The message to display (slots)
     */
    msg: string
  }) => any
}
/**
 * The expose for the MyComponent component
 */
export interface MyComponentExpose {
  /**
   * The message to display (expose)
   */
  msg: string
}

/**
 * Type Foo
 */
export type Foo = string | number

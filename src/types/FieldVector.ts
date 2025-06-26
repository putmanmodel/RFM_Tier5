/**
 * Relational field between two agents’ emotion streams.
 * All components range from -1 to +1, where >0 indicates positive pull.
 */
export interface FieldVector {
  /** Angular tension or conflict */
  tension: number
  /** Mutual positive pull */
  attraction: number
  /** Mutual repulsion or avoidance */
  repulsion: number
  /** Degree of symbolic conflict (0–1) */
  symbolicClash: number
  /** Optional humor alignment (0–1) */
  humorSync?: number
}
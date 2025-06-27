/**
 * Relational field between two agents’ emotion streams.
 * 
 * – tension, attraction, repulsion: range −1 to +1  
 * – symbolicClash, humorSync, overlap, divergence: range 0 to +1  
 * 
 * Positive values always indicate a “pull” or alignment effect.
 */
export interface FieldVector {
  /** Angular tension or conflict (−1 to +1) */
  tension: number;
  /** Mutual positive pull (−1 to +1) */
  attraction: number;
  /** Mutual repulsion or avoidance (−1 to +1) */
  repulsion: number;
  /** Degree of symbolic conflict (0 to +1) */
  symbolicClash: number;
  /** Degree of humor alignment (0 to +1) */
  humorSync?: number;
  /** Degree of overlap or shared context (0 to +1) */
  overlap: number;
  /** Degree of semantic drift or oppositional framing (0 to +1) */
  divergence?: number;
}
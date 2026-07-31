// Sign Language Animation Converter for React
export class SignLanguageConverter {
  constructor() {
    this.signDatabase = {
      // Arabic phrases
      'مرحباً': { sign: 'hello', duration: 600 },
      'مرحبا': { sign: 'hello', duration: 600 },
      'شكراً': { sign: 'thank-you', duration: 700 },
      'شكرا': { sign: 'thank-you', duration: 700 },
      'من فضلك': { sign: 'please', duration: 700 },
      'نعم': { sign: 'yes', duration: 500 },
      'لا': { sign: 'no', duration: 500 },
      'مساعدة': { sign: 'help', duration: 700 },
      'تمام': { sign: 'yes', duration: 500 },
      'سلام': { sign: 'hello', duration: 600 },
      'وداعاً': { sign: 'hello', duration: 700 },
      'انتبه': { sign: 'yes', duration: 600 },
      
      // English phrases
      'hello': { sign: 'hello', duration: 600 },
      'hi': { sign: 'hello', duration: 600 },
      'thank': { sign: 'thank-you', duration: 700 },
      'thanks': { sign: 'thank-you', duration: 700 },
      'please': { sign: 'please', duration: 700 },
      'yes': { sign: 'yes', duration: 500 },
      'no': { sign: 'no', duration: 500 },
      'help': { sign: 'help', duration: 700 },
      'goodbye': { sign: 'hello', duration: 700 },
      'bye': { sign: 'hello', duration: 700 }
    };
  }

  /**
   * Convert text to sign animation
   */
  textToSign(text) {
    const lowerText = text.toLowerCase().trim();
    
    // Check for exact match
    if (this.signDatabase[lowerText]) {
      return this.signDatabase[lowerText].sign;
    }

    // Check for partial matches
    for (const [key, value] of Object.entries(this.signDatabase)) {
      if (lowerText.includes(key) || key.includes(lowerText)) {
        return value.sign;
      }
    }

    // Default to hello
    return 'hello';
  }

  /**
   * Get all available signs
   */
  getAvailableSigns() {
    return [...new Set(Object.values(this.signDatabase).map(item => item.sign))];
  }
}

// Export singleton instance
export const signConverter = new SignLanguageConverter();

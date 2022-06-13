import "./components/App";

declare global {
    namespace preact.JSX {
      interface IntrinsicElements {
        // This catch all allows all elements through
        // [elemName: string]: any;
      }
    }
  }
  
  // Let tsc know that this is a module
  export {};

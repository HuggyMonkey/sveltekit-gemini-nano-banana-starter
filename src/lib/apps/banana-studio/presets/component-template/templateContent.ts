export const templateContent = [
    // CORE MUST-HAVES
    {
      id: "background-removal",
      name: "Background Removal",
      description: "Remove the background from the image",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Remove Background"
    },
    {
      id: "background-replacement",
      name: "Background Replacement",
      description: "Replace the background with a new one",
      userInputRequired: true,
      userInputPlaceholder: "Describe the new background",
      actionButtonText: "Replace Background"
    },
    {
      id: "object-removal",
      name: "Object Removal",
      description: "Remove unwanted objects from the image",
      userInputRequired: true,
      userInputPlaceholder: "Describe the object(s) to remove",
      actionButtonText: "Remove Object"
    },
    {
      id: "object-addition",
      name: "Object Addition",
      description: "Add objects into the image",
      userInputRequired: true,
      userInputPlaceholder: "Describe the object(s) to add",
      actionButtonText: "Add Object"
    },
    {
      id: "face-retouching",
      name: "Face Retouching",
      description: "Retouch and enhance faces naturally",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Retouch Face"
    },
    {
      id: "sky-replacement",
      name: "Sky Replacement",
      description: "Replace the sky in the image",
      userInputRequired: true,
      userInputPlaceholder: "Describe the new sky",
      actionButtonText: "Replace Sky"
    },
  
    // CREATIVE & FUN
    {
      id: "style-transfer",
      name: "Style Transfer",
      description: "Apply an artistic style to the image",
      userInputRequired: true,
      userInputPlaceholder: "Describe the artistic style (e.g., oil painting, anime)",
      actionButtonText: "Apply Style"
    },
    {
      id: "film-styles",
      name: "Film & Photography Styles",
      description: "Apply cinematic or photography-inspired styles",
      userInputRequired: true,
      userInputPlaceholder: "Describe the style (e.g., cinematic, vintage)",
      actionButtonText: "Apply Style"
    },
    {
      id: "cartoon-avatar",
      name: "Cartoon / Avatar Creation",
      description: "Transform the subject into a cartoon or avatar",
      userInputRequired: true,
      userInputPlaceholder: "Describe the cartoon style",
      actionButtonText: "Create Cartoon"
    },
    {
      id: "double-exposure",
      name: "AI Double Exposure",
      description: "Blend the image with another concept",
      userInputRequired: true,
      userInputPlaceholder: "Describe the secondary concept or scene",
      actionButtonText: "Create Double Exposure"
    },
    {
      id: "season-change",
      name: "Season Change",
      description: "Transform the scene into another season",
      userInputRequired: true,
      userInputPlaceholder: "Describe the season (e.g., winter, autumn)",
      actionButtonText: "Change Season"
    },
    {
      id: "makeup-styling",
      name: "Makeup & Styling",
      description: "Apply virtual makeup or styling",
      userInputRequired: true,
      userInputPlaceholder: "Describe the makeup or style",
      actionButtonText: "Apply Styling"
    },
  
    // PROFESSIONAL & BUSINESS
    {
      id: "product-photography",
      name: "Product Photography",
      description: "Generate professional product photos",
      userInputRequired: true,
      userInputPlaceholder: "Describe the desired setting or background",
      actionButtonText: "Enhance Product"
    },
    {
      id: "virtual-staging",
      name: "Virtual Staging",
      description: "Stage interiors with virtual furniture",
      userInputRequired: true,
      userInputPlaceholder: "Describe the furniture or decor style",
      actionButtonText: "Stage Room"
    },
    {
      id: "ad-mockup",
      name: "Ad Mockup",
      description: "Insert designs into advertising mockups",
      userInputRequired: true,
      userInputPlaceholder: "Describe where to place the ad (e.g., billboard, packaging)",
      actionButtonText: "Create Mockup"
    },
    {
      id: "logo-overlay",
      name: "Logo Overlay / Branding",
      description: "Add a logo or watermark to the image",
      userInputRequired: true,
      userInputPlaceholder: "Upload or describe the logo/branding",
      actionButtonText: "Add Logo"
    },
    {
      id: "ecommerce-optimization",
      name: "E-commerce Optimization",
      description: "Prepare product photos for online stores",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Optimize Image"
    },
    {
      id: "id-photo",
      name: "ID Photo Preset",
      description: "Generate professional ID or passport photos",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Generate ID Photo"
    },
    {
      id: "group-photo-fix",
      name: "Group Photo Fix",
      description: "Fix issues in group photos",
      userInputRequired: true,
      userInputPlaceholder: "Describe the fix (e.g., remove a person, open eyes)",
      actionButtonText: "Fix Group Photo"
    },
    {
      id: "pose-correction",
      name: "Pose Correction / Head Swap",
      description: "Adjust subject’s pose or facial orientation",
      userInputRequired: true,
      userInputPlaceholder: "Describe the correction (e.g., head turned left)",
      actionButtonText: "Correct Pose"
    }
  ];

  export const templateContentMulti = [
    // 🔑 Core Must-Haves
    {
      id: "face-swap",
      name: "Face Swap",
      description: "Swap the face from one image with the face from another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Swap Faces"
    },
    {
      id: "style-transfer-ref",
      name: "Style Transfer (Reference)",
      description: "Apply the style of one image onto another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Apply Style"
    },
    {
      id: "scene-composition",
      name: "Scene Composition",
      description: "Place a subject into a new background scene.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Compose Scene"
    },
    {
      id: "product-in-context",
      name: "Product in Context",
      description: "Insert a product into a realistic context image.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Place Product"
    },
    {
      id: "color-grading-ref",
      name: "Color Grading by Reference",
      description: "Match the colors and mood of one photo to another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Match Colors"
    },
    {
      id: "before-after-presentation",
      name: "Before & After Presentation",
      description: "Combine two photos into a before/after layout.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Create Before/After"
    },
  
    // 🎭 Creative & Fun
    {
      id: "image-merge-collage",
      name: "Image Merge / Collage Maker",
      description: "Blend two images into a single collage.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Merge Images"
    },
    {
      id: "double-exposure",
      name: "Double Exposure",
      description: "Create a double exposure effect with two images.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Create Double Exposure"
    },
    {
      id: "face-morphing",
      name: "Face Morphing",
      description: "Blend two faces into one composite.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Morph Faces"
    },
    {
      id: "outfit-transfer",
      name: "Outfit Transfer",
      description: "Apply clothing style from one subject to another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Transfer Outfit"
    },
    {
      id: "makeup-transfer",
      name: "Makeup Transfer",
      description: "Apply makeup style from one subject to another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Transfer Makeup"
    },
    {
      id: "hair-transfer",
      name: "Hair Transfer",
      description: "Apply hairstyle from one subject to another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Transfer Hairstyle"
    },
    {
      id: "pose-transfer",
      name: "Pose Transfer",
      description: "Apply the pose from one subject to another.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Transfer Pose"
    },
  
    // 💼 Professional & Business
    {
      id: "virtual-background-matching",
      name: "Virtual Background Matching",
      description: "Place subject into a professional background setting.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Match Background"
    },
    {
      id: "reference-guided-retouching",
      name: "Reference-Guided Retouching",
      description: "Retouch an image using another as reference.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Retouch Image"
    },
    {
      id: "ad-mockup",
      name: "Ad Mockup",
      description: "Insert branding or design into a mockup image.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Create Mockup"
    },
    {
      id: "photo-restoration-ref",
      name: "Photo Restoration with Reference",
      description: "Restore a damaged photo using a clean reference.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Restore Photo"
    },
  
    // ⚡ Utility / Photography
    {
      id: "panorama-stitching",
      name: "Panorama Stitching",
      description: "Stitch two overlapping images into a panorama.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Stitch Panorama"
    },
    {
      id: "hdr-merge",
      name: "HDR Merge",
      description: "Merge two exposures into a single HDR photo.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Merge HDR"
    },
    {
      id: "duplicate-removal-ref",
      name: "Duplicate Removal with Reference",
      description: "Remove unwanted elements using a clean reference image.",
      userInputRequired: false,
      userInputPlaceholder: "No input required",
      actionButtonText: "Remove Duplicates"
    }
  ];
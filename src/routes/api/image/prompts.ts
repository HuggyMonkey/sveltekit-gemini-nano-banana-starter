

export interface EditPresetPrompt {
  preset_id: string;
  preset_name: string;
  task_description: string;
  instructions: string[];
  user_input_required: boolean;
}


export function buildPrompt(presetId: string, userInput = "", presetPrompts: EditPresetPrompt[]) {
  const preset = presetPrompts.find(p => p.preset_id === presetId);

  if (!preset) {
    throw new Error(`Preset with id "${presetId}" not found.`);
  }

  if (preset.user_input_required && !userInput) {
    throw new Error(`Preset "${preset.preset_name}" requires user input.`);
  }

  const instructions = [
    ...preset.instructions
  ];

  const parts = [
    "You are an expert photo editor.",
    `Task: ${preset.task_description}`,
    "Instructions:",
    ...instructions.map(i => `- ${i}`)
  ];

  if (preset.user_input_required && userInput) {
    parts.push(`User input: ${userInput}`);
  }

  const promptString = parts.join("\n");

  return {
    preset_id: preset.preset_id,
    preset_name: preset.preset_name,
    task_description: preset.task_description,
    instructions,
    user_input: preset.user_input_required ? userInput : null,
    prompt_string: promptString
  };
}

export const presetPromptLibrary: EditPresetPrompt[] = [
    {
    preset_id: "background-removal",
    preset_name: "Background Removal",
    task_description: "Remove the entire background from the input image, leaving only the subject isolated on a white background.",
    instructions: [
    "Preserve subject sharpness, details, and natural colors.",
    "Smooth edges around subject.",
    "Ensure no background fragments remain.",
    "Return subject on a white background."
    ],
    user_input_required: false
    },
    {
    preset_id: "background-replacement",
    preset_name: "Background Replacement",
    task_description: "Replace the background with a new one described by the user.",
    instructions: [
    "Keep subject intact and unchanged.",
    "Blend edges seamlessly into the new background.",
    "Match lighting, shadows, and color tones."
    ],
    user_input_required: true
    },
    {
    preset_id: "object-removal",
    preset_name: "Object Removal",
    task_description: "Remove specific objects from the input image.",
    instructions: [
    "Fill removed areas naturally using surrounding textures.",
    "Match perspective and lighting.",
    "Ensure no visual artifacts or blurry patches remain."
    ],
    user_input_required: true
    },
    {
    preset_id: "object-addition",
    preset_name: "Object Addition",
    task_description: "Add specific object(s) into the input image.",
    instructions: [
    "Place object realistically without distorting composition.",
    "Match lighting, perspective, and shadows with the scene.",
    "Ensure object integration looks seamless."
    ],
    user_input_required: true
    },
    {
    preset_id: "face-retouching",
    preset_name: "Face Retouching",
    task_description: "Retouch face(s) to look polished but natural.",
    instructions: [
    "Remove blemishes, reduce under-eye circles, whiten teeth.",
    "Smooth skin slightly without plastic/artificial look.",
    "Preserve natural facial texture, proportions, and lighting."
    ],
    user_input_required: false
    },
    {
    preset_id: "sky-replacement",
    preset_name: "Sky Replacement",
    task_description: "Replace the sky in the image with a new sky described by the user.",
    instructions: [
    "Keep all non-sky areas unchanged.",
    "Blend horizon and sky transition smoothly.",
    "Adjust lighting and tones of sky to match the scene."
    ],
    user_input_required: true
    },
    

    {
    preset_id: "style-transfer",
    preset_name: "Style Transfer",
    task_description: "Apply an artistic style to the input image based on user description.",
    instructions: [
    "Preserve subject structure and proportions.",
    "Apply new style consistently across the whole image.",
    "Maintain clarity without excessive distortion."
    ],
    user_input_required: true
    },
    {
    preset_id: "film-styles",
    preset_name: "Film & Photography Styles",
    task_description: "Apply cinematic or photography-inspired color grading to the image.",
    instructions: [
    "Adjust colors, tones, and contrast to match style.",
    "Preserve subject details and realism.",
    "Do not add or remove objects."
    ],
    user_input_required: true
    },
    {
    preset_id: "cartoon-avatar",
    preset_name: "Cartoon / Avatar Creation",
    task_description: "Transform the subject into a cartoon, comic, or animated style.",
    instructions: [
    "Keep subject recognizable.",
    "Apply consistent artistic style.",
    "Avoid excessive distortion of key features."
    ],
    user_input_required: true
    },
    {
    preset_id: "double-exposure",
    preset_name: "AI Double Exposure",
    task_description: "Blend the input image with a secondary concept or scene for a double exposure effect.",
    instructions: [
    "Overlay secondary image/effect artistically.",
    "Maintain balance between both images.",
    "Preserve subject recognizability."
    ],
    user_input_required: true
    },
    {
    preset_id: "season-change",
    preset_name: "Season Change",
    task_description: "Transform the scene into a different season described by the user.",
    instructions: [
    "Change environment elements (trees, colors, snow, etc.) consistently.",
    "Preserve main subject details.",
    "Adjust lighting and atmosphere to match season."
    ],
    user_input_required: true
    },
    {
    preset_id: "makeup-styling",
    preset_name: "Makeup & Styling",
    task_description: "Virtually apply makeup or style changes to the subject.",
    instructions: [
    "Apply changes naturally and realistically.",
    "Preserve subject’s facial proportions.",
    "Ensure style matches description without distortion."
    ],
    user_input_required: true
    },
    
    
    {
    preset_id: "product-photography",
    preset_name: "Product Photography",
    task_description: "Place product into a professional photography setting or background.",
    instructions: [
    "Keep product proportions unchanged.",
    "Ensure lighting matches background style.",
    "Make the product the clear focal point."
    ],
    user_input_required: true
    },
    {
    preset_id: "virtual-staging",
    preset_name: "Virtual Staging",
    task_description: "Replace or add furniture and decor to a real estate interior photo.",
    instructions: [
    "Place furniture proportionally within the room.",
    "Match lighting and perspective.",
    "Ensure room looks realistically staged."
    ],
    user_input_required: true
    },
    {
    preset_id: "ad-mockup",
    preset_name: "Ad Mockup",
    task_description: "Insert product or design into an advertising mockup (e.g., billboard, packaging).",
    instructions: [
    "Align design properly with mockup surface.",
    "Preserve perspective and proportions.",
    "Ensure realistic blending with environment."
    ],
    user_input_required: true
    },
    {
    preset_id: "logo-overlay",
    preset_name: "Logo Overlay / Branding",
    task_description: "Overlay a logo, watermark, or branding element on the image.",
    instructions: [
    "Position logo cleanly without obscuring key subjects.",
    "Preserve logo clarity and proportions.",
    "Ensure overlay blends naturally with background."
    ],
    user_input_required: true
    },
    {
    preset_id: "ecommerce-optimization",
    preset_name: "E-commerce Optimization",
    task_description: "Prepare product photos for online stores with clean backgrounds and consistent sizing.",
    instructions: [
    "Center product with uniform crop.",
    "Use plain white or consistent background.",
    "Preserve product sharpness and detail."
    ],
    user_input_required: false
    },
    {
    preset_id: "id-photo",
    preset_name: "ID Photo Preset",
    task_description: "Generate a professional ID or passport photo from the input image.",
    instructions: [
    "Crop subject to head-and-shoulders format.",
    "Apply plain light-colored background.",
    "Ensure face is clear, neutral, and well-lit."
    ],
    user_input_required: false
    },
    {
    preset_id: "group-photo-fix",
    preset_name: "Group Photo Fix",
    task_description: "Fix issues in group photos, such as closed eyes, missing people, or unwanted people.",
    instructions: [
    "Correct eyes or facial expressions naturally.",
    "Blend added/removed people seamlessly.",
    "Maintain consistent lighting and proportions."
    ],
    user_input_required: true
    },
    {
    preset_id: "pose-correction",
    preset_name: "Pose Correction / Head Swap",
    task_description: "Adjust subject’s pose, posture, or facial orientation.",
    instructions: [
    "Correct pose naturally without distortion.",
    "Maintain realistic anatomy and proportions.",
    "Ensure clothing and hair adapt naturally."
    ],
    user_input_required: true
    }
  ];

  export const presetBlendPromptLibrary: EditPresetPrompt[] = [
    // Core Must-Haves
    {
      preset_id: "face-swap",
      preset_name: "Face Swap",
      task_description: "Replace the face in the primary image with the face from the reference image while preserving realism.",
      instructions: [
        "The first image is the primary image and the second image is the reference image.",
        "Align the reference face naturally with the subject’s head position in the primary image.",
        "Preserve skin tone, lighting, and facial proportions for realism.",
        "Blend edges seamlessly to avoid visible artifacts.",
        "Ensure eyes, mouth, and facial expression remain natural."
      ],
      user_input_required: false
    },
    {
      preset_id: "style-transfer-ref",
      preset_name: "Style Transfer (Reference)",
      task_description: "Apply the visual style of image 1 to image 2.",
      instructions: [
        "Extract the artistic style, color palette, and textures from the reference image.",
        "Apply these stylistic elements to the primary image while keeping its subject and structure intact.",
        "Maintain overall clarity and recognizable features of the primary image.",
        "Avoid distortions that obscure the original content."
      ],
      user_input_required: false
    },
    {
      preset_id: "scene-composition",
      preset_name: "Scene Composition",
      task_description: "Extract the subject from the primary image and place it into the reference background image.",
      instructions: [
        "Cleanly cut out the subject from the primary image.",
        "Insert the subject into the reference background with natural scale and perspective.",
        "Match lighting, shadows, and colors between subject and background.",
        "Blend edges smoothly so the subject integrates seamlessly into the new scene."
      ],
      user_input_required: false
    },
    {
      preset_id: "product-in-context",
      preset_name: "Product in Context",
      task_description: "Place the product from the primary image into the environment provided in the reference image.",
      instructions: [
        "Cut out the product cleanly from the primary image.",
        "Position it realistically within the context of the reference image.",
        "Ensure shadows, reflections, and lighting match the scene.",
        "Maintain accurate proportions and sharpness for a professional look."
      ],
      user_input_required: false
    },
    {
      preset_id: "color-grading-ref",
      preset_name: "Color Grading by Reference",
      task_description: "Match the color palette and mood of the primary image to that of the reference image.",
      instructions: [
        "Extract dominant colors, tones, and contrast levels from the reference image.",
        "Apply these adjustments to the primary image while preserving subject clarity.",
        "Ensure skin tones and natural elements remain realistic.",
        "Avoid over-saturation or unnatural color shifts."
      ],
      user_input_required: false
    },
    {
      preset_id: "before-after-presentation",
      preset_name: "Before & After Presentation",
      task_description: "Combine image 1 and image 2 into a single presentation showing before-and-after.",
      instructions: [
        "Align both images side-by-side or in a split layout",
        "Ensure both images retain original resolution and clarity.",
        "Add a clean divider or subtle fade between them.",
        "Maintain balanced composition for professional presentation."
      ],
      user_input_required: false
    },
  
    // Creative & Fun
    {
      preset_id: "image-merge-collage",
      preset_name: "Image Merge / Collage Maker",
      task_description: "Blend two photos into one artistic collage or merged composition.",
      instructions: [
        "Align and scale both images for balanced composition.",
        "Blend edges smoothly to avoid harsh separations.",
        "Allow artistic overlap where appropriate.",
        "Maintain overall clarity and visual harmony."
      ],
      user_input_required: false
    },
    {
      preset_id: "double-exposure",
      preset_name: "Double Exposure",
      task_description: "Create a classic double exposure effect by blending two images.",
      instructions: [
        "Overlay the secondary image artistically onto the primary image.",
        "Adjust opacity, blending, and textures for a creative effect.",
        "Preserve key features of both images without clutter.",
        "Ensure a balanced, visually appealing double exposure."
      ],
      user_input_required: false
    },
    {
      preset_id: "face-morphing",
      preset_name: "Face Morphing",
      task_description: "Blend two faces into a single realistic or artistic composite.",
      instructions: [
        "Align facial features from both images accurately.",
        "Blend skin tones, lighting, and proportions naturally.",
        "Maintain symmetry and avoid distorted facial features.",
        "Produce a composite that feels coherent and realistic."
      ],
      user_input_required: false
    },
    {
      preset_id: "outfit-transfer",
      preset_name: "Outfit Transfer",
      task_description: "Transfer clothing style from the reference subject to the primary subject.",
      instructions: [
        "Extract outfit details such as texture, pattern, and fit from the reference image.",
        "Apply these to the subject in the primary image naturally.",
        "Ensure correct alignment with body shape and pose.",
        "Preserve fabric realism and natural folds."
      ],
      user_input_required: false
    },
    {
      preset_id: "makeup-transfer",
      preset_name: "Makeup Transfer",
      task_description: "Apply makeup style from one subject to another.",
      instructions: [
        "Extract makeup details including eyeshadow, lipstick, and contouring from the reference image.",
        "Apply makeup naturally to the subject in the primary image.",
        "Preserve skin texture and facial realism.",
        "Avoid exaggerated or artificial blending."
      ],
      user_input_required: false
    },
    {
      preset_id: "hair-transfer",
      preset_name: "Hair Transfer",
      task_description: "Apply hairstyle from one subject to another.",
      instructions: [
        "Extract hairstyle shape, texture, and color from the reference image.",
        "Fit the hairstyle onto the subject in the primary image naturally.",
        "Ensure realistic alignment with head shape and perspective.",
        "Blend seamlessly with lighting and shadows."
      ],
      user_input_required: false
    },
    {
      preset_id: "pose-transfer",
      preset_name: "Pose Transfer",
      task_description: "Apply the body or facial pose from one subject to another.",
      instructions: [
        "Analyze body or facial pose from the reference subject.",
        "Adjust the primary subject’s posture, orientation, or gesture to match.",
        "Preserve subject identity and realism.",
        "Ensure natural limb proportions and facial alignment."
      ],
      user_input_required: false
    },
  
    // Professional & Business
    {
      preset_id: "virtual-background-matching",
      preset_name: "Virtual Background Matching",
      task_description: "Place the subject into a professional background setting.",
      instructions: [
        "Extract subject cleanly from the primary image.",
        "Integrate into the reference background naturally.",
        "Match lighting, perspective, and shadows.",
        "Produce a professional, studio-quality result."
      ],
      user_input_required: false
    },
    {
      preset_id: "reference-guided-retouching",
      preset_name: "Reference-Guided Retouching",
      task_description: "Retouch subject using another image as visual reference.",
      instructions: [
        "Analyze skin tones, lighting, and style from the reference image.",
        "Apply consistent retouching to the subject in the primary image.",
        "Preserve natural textures and details.",
        "Avoid over-smoothing or artificial edits."
      ],
      user_input_required: false
    },
    {
      preset_id: "ad-mockup",
      preset_name: "Ad Mockup",
      task_description: "Place branding or design from one image into the environment of another.",
      instructions: [
        "Extract design elements (logo, artwork, product) from the primary image.",
        "Insert them onto surfaces in the reference image (e.g., billboard, packaging).",
        "Ensure correct perspective, shadows, and reflections.",
        "Blend seamlessly into the environment."
      ],
      user_input_required: false
    },
    {
      preset_id: "photo-restoration-ref",
      preset_name: "Photo Restoration with Reference",
      task_description: "Restore a damaged photo using another clean or undamaged photo as a guide.",
      instructions: [
        "Identify missing or damaged areas in the primary image.",
        "Use the reference image for details and accurate reconstruction.",
        "Preserve original photo’s authenticity and style.",
        "Ensure natural blending without visible patches."
      ],
      user_input_required: false
    },
  
    // Utility / Photography
    {
      preset_id: "panorama-stitching",
      preset_name: "Panorama Stitching",
      task_description: "Combine two overlapping images into a seamless panoramic photo.",
      instructions: [
        "Align overlapping areas precisely between both images.",
        "Blend exposure, colors, and lighting smoothly.",
        "Avoid visible seams or duplication.",
        "Output a wide panoramic format image."
      ],
      user_input_required: false
    },
    {
      preset_id: "hdr-merge",
      preset_name: "HDR Merge",
      task_description: "Merge two exposures into a single high dynamic range (HDR) image.",
      instructions: [
        "Analyze dark and bright areas in both images.",
        "Combine to preserve highlights and shadow detail.",
        "Ensure balanced lighting and natural colors.",
        "Avoid halo effects or unnatural contrast."
      ],
      user_input_required: false
    },
    {
      preset_id: "duplicate-removal-ref",
      preset_name: "Duplicate Removal with Reference",
      task_description: "Use a clean reference image to remove objects or people from the primary image.",
      instructions: [
        "Identify unwanted elements in the primary image.",
        "Replace those areas with clean background from the reference image.",
        "Ensure seamless blending and natural textures.",
        "Preserve perspective and lighting consistency."
      ],
      user_input_required: false
    }
  ];
  
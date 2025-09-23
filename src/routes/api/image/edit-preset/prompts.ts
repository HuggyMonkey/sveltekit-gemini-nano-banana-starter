

export interface EditPresetPrompt {
  preset_id: string;
  preset_name: string;
  task_description: string;
  instructions: string[];
  user_input_required: boolean;
}

export const presetPromptLibrary: EditPresetPrompt[] = [
    {
    preset_id: "background_removal",
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
    preset_id: "background_replacement",
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
    preset_id: "object_removal",
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
    preset_id: "object_addition",
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
    preset_id: "face_retouching",
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
    preset_id: "sky_replacement",
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
    preset_id: "style_transfer",
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
    preset_id: "film_styles",
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
    preset_id: "cartoon_avatar",
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
    preset_id: "double_exposure",
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
    preset_id: "season_change",
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
    preset_id: "makeup_styling",
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
    preset_id: "product_photography",
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
    preset_id: "virtual_staging",
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
    preset_id: "ad_mockup",
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
    preset_id: "logo_overlay",
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
    preset_id: "ecommerce_optimization",
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
    preset_id: "id_photo",
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
    preset_id: "group_photo_fix",
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
    preset_id: "pose_correction",
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
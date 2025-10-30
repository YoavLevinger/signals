# Drawing Analysis App - User Manual

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Main Features](#main-features)
4. [Drawing Analyzer](#drawing-analyzer)
5. [Free Drawing](#free-drawing)
6. [Guided Drawing](#guided-drawing)
7. [Director](#director)
8. [Language Support](#language-support)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Introduction

The **Drawing Analysis App** is an AI-powered tool designed to help professionals analyze children's drawings for behavioral and emotional indicators. The application combines advanced computer vision with proven psychological assessment frameworks to provide insights into a child's emotional state and potential concerns.

### Key Capabilities

- **AI-Powered Analysis**: Uses advanced vision models to analyze drawings
- **Structured Assessment**: Based on validated psychological assessment methods (Draw-A-Person test, House-Tree-Person test)
- **Multiple Drawing Tools**: Free drawing canvas and guided drawing with pre-made elements
- **Multi-language Support**: Available in 11 languages
- **PDF Export**: Generate professional PDF reports of analysis results
- **Image Management**: Upload, preview, and analyze drawings with ease

---

## Getting Started

### Accessing the Application

1. Open your web browser (Chrome, Firefox, Safari, or Edge recommended)
2. Navigate to the application URL (typically `http://localhost:3000` for local installations)
3. You will see the main menu with six feature options

### Main Menu Overview

The main page displays six cards representing the different modules:

1. **Drawing Analyzer** - Analyze uploaded drawings
2. **Guided Drawing** - Create drawings with predefined elements
3. **Free Drawing** - Draw freely on a digital canvas
4. **Questioner** - Questionnaire module
5. **Director** - Image description tool
6. **Picker** - Selection tool

Click on any card to access that feature. Use the **← Back** button (or language selector equivalent) to return to the main menu.

---

## Language Support

The application supports **11 languages**:

- English
- Hebrew (עברית)
- Arabic (العربية)
- Russian (Русский)
- German (Deutsch)
- French (Français)
- Italian (Italiano)
- Spanish (Español)
- Mandarin Chinese (中文)
- Japanese (日本語)
- Portuguese (Português)

### Changing the Language

1. Look for the language selector dropdown in the top-right corner of the header
2. Click on the dropdown menu
3. Select your preferred language
4. The entire interface will update to your selected language immediately

**Note**: The application automatically detects your browser's language preference, but you can override it using the language selector.

---

## Drawing Analyzer

The **Drawing Analyzer** is the core feature of the application. It allows you to upload a child's drawing and receive an AI-powered analysis based on psychological assessment frameworks.

### Step-by-Step Guide

#### 1. Accessing Drawing Analyzer

- Click on the **Drawing Analyzer** card from the main menu

#### 2. Uploading a Drawing

You have two options for uploading:

**Option A: Upload from Device**
- Click the **"Choose File"** button (or the upload area)
- Select an image file from your device
- Supported formats: JPG, PNG, JPEG
- Maximum file size: 5MB

**Option B: Take a Photo (Mobile Devices)**
- Click the **"Choose File"** button
- On mobile devices, you'll be prompted to use your camera
- Take a photo of the drawing directly
- The image will be automatically uploaded

**Image Preview**:
- After selecting an image, a preview will appear below the upload button
- The preview shows the selected file name and the image itself
- Review the image to ensure it's clear and properly oriented

#### 3. Answering Assessment Questions

Below the image preview, you'll find a series of question groups. These questions are based on validated psychological assessment methods:

**🧍 Human Figure Characteristics**
- Questions about the human figure (hands, arms, neck, legs, genitalia)
- Each question has a tooltip (ℹ️) with research references

**👁️ Facial Features and Expression**
- Questions about facial elements (face expression, mouth, ears)
- Focuses on emotional indicators

**🏠 House-Tree-Person (HTP) and Environmental Symbols**
- Questions about house, trees, and environmental elements
- Assesses feelings of security and stability

**🎨 Symbolic and Emotional Indicators**
- Questions about symbolic elements (phallic shapes, colors, hearts, isolation)
- Identifies emotional distress indicators

**How to Answer**:
- Review each question carefully
- Check the boxes for all items that apply to the drawing
- Multiple selections are allowed
- Hover over the ℹ️ icon to see research references and explanations
- You can select or deselect items at any time before submitting

#### 4. Analyzing the Drawing

1. **Double-check your selections**: Review your checkbox selections
2. **Click "Analyze"**: The button is located at the bottom of the questionnaire
3. **Wait for processing**: 
   - You'll see a message: "Analyzing image, please wait..."
   - The analysis typically takes 10-30 seconds
   - Do not close the browser during analysis

#### 5. Viewing Results

After analysis completes:
- The AI-generated analysis will appear below the form
- Results are displayed in a formatted text format
- The analysis includes observations about the drawing based on your selected indicators

#### 6. Downloading Results as PDF

1. Scroll to the bottom of the analysis results
2. Click the **"Download PDF"** button
3. A PDF file will be generated and downloaded to your device
4. The PDF includes:
   - The uploaded drawing image
   - All selected questionnaire responses
   - The complete AI-generated analysis

**Note**: Large analysis results may span multiple pages in the PDF.

### Understanding the Assessment Framework

The assessment is based on established psychological research, including:

- **Draw-A-Person (DAP) Test**: Analyzes how children draw human figures
- **House-Tree-Person (HTP) Test**: Evaluates environmental and symbolic elements
- **Emotional Indicators**: Based on Koppitz and other validated frameworks

Each question includes research references that can be accessed via the tooltip icons.

### Tips for Best Results

- **Clear Images**: Ensure the drawing is well-lit and in focus
- **Complete Assessment**: Answer all relevant questions for comprehensive analysis
- **Context Matters**: Consider the child's age and developmental stage when interpreting results
- **Professional Review**: AI analysis should be reviewed by qualified professionals
- **Save Results**: Download PDFs for record-keeping and professional documentation

---

## Free Drawing

The **Free Drawing** tool provides a blank canvas for digital drawing. It's useful for:
- Creating new drawings digitally
- Drawing exercises or activities
- Practicing drawing skills

### Features

#### Drawing Tools

**🖌️ Brush Tool**:
- Primary drawing tool
- Click and drag to draw
- Supports mouse and touch input (for tablets/touchscreens)
- Adjustable line width (4px default)

**🧽 Eraser Tool**:
- Removes drawn content
- Larger size than brush for easier erasing
- Works by drawing white over existing content

#### Tool Selection

- Click **"🖌️ Brush"** to select the brush tool
- Click **"🧽 Eraser"** to select the eraser tool
- The active tool is highlighted

#### Color Selection

The application provides 8 color options:
- Black (#222) - Default
- Red
- Green
- Blue
- Yellow
- Purple
- Orange
- Cyan

Click any color circle to select it. The selected color appears with a border.

#### Canvas Controls

**🗑️ Clear**:
- Clears the entire canvas
- Removes all drawing content
- This action cannot be undone

**↩️ Undo**:
- Reverses the last drawing action
- Can be used multiple times to undo several steps

**↪️ Redo**:
- Restores an action that was undone
- Only available after using Undo

### Using Free Drawing

1. **Start Drawing**:
   - Click and hold the mouse button (or touch the screen on mobile)
   - Drag to draw lines
   - Release to stop drawing

2. **Change Colors**:
   - Click a color from the color palette
   - Continue drawing with the new color

3. **Erase Mistakes**:
   - Select the eraser tool
   - Click and drag over areas to erase

4. **Undo/Redo**:
   - Use the undo button to remove the last action
   - Use redo to restore an undone action

### Touch Support

The Free Drawing tool fully supports touch screens:
- Use your finger or stylus to draw
- Works on tablets and touch-enabled devices
- Pinch-to-zoom and pan are supported by the browser

---

## Guided Drawing

The **Guided Drawing** tool allows children to create drawings using pre-made elements. This structured approach can help assess specific aspects of a child's perception and expression.

### Features

#### Drawing Sections

The tool organizes drawing elements into categories:

**Family**:
- Father
- Mother
- Brother
- Sister

**Body Parts**:
- Head, arm, leg, hand, foot, torso
- Eye, ear, mouth, nose, hair
- Finger, toe, neck, eyebrow, eyelash

**Home Tools & Accessories**:
- Furniture: Chair, table, bed, lamp
- Household items: Spoon, fork, knife, cup
- Electronics: TV, phone, clock, remote
- Personal items: Shoe, hat, toothbrush, soap, towel, mirror
- Tools: Scissors, broom, vacuum, iron, fan
- Other: Book, plant, fridge, oven, washing machine, curtain, picture

#### Drawing Tools

**🖌️ Brush**: Draw freely on the canvas

**🧽 Eraser**: Erase drawn content

**🤚 Hand Tool**: 
- Select this tool to interact with placed elements
- Move elements around the canvas
- Select elements for manipulation

**🗑️ Clear**: Remove all content from canvas

**↩️ Undo / ↪️ Redo**: Undo or redo actions

### Using Guided Drawing

#### Placing Elements

1. **Select a Section**: Click on a section name (Family, Body Parts, or Home Tools & Accessories)
2. **Choose an Item**: Click on any item icon in that section
3. **Place on Canvas**: 
   - Click anywhere on the canvas to place the item
   - The item appears as a draggable object
4. **Repeat**: Continue placing items as needed

#### Moving Elements

1. **Select Hand Tool**: Click the "🤚 Hand" button
2. **Drag Elements**: Click and drag any placed element to move it
3. **Position**: Release to place the element in the new location

#### Drawing on Canvas

1. **Select Brush Tool**: Click "🖌️ Brush"
2. **Draw**: Click and drag to draw lines
3. **Use Colors**: Select a color from the color palette before drawing

#### Removing Elements

1. **Select Hand Tool**: Click "🤚 Hand"
2. **Click Element**: Click on an element to select it
3. **Delete**: Use the eraser tool or clear function
   - Or click delete/remove if available in the interface

### Best Practices for Guided Drawing

- **Let the Child Lead**: Allow children to choose which elements to place and where
- **Observe Choices**: Note which items children select and their positioning
- **Encourage Storytelling**: Ask children to explain their drawing
- **Document Sequence**: Note the order in which elements are added
- **Save Results**: Consider taking screenshots for documentation

---

## Director

The **Director** module is designed for image description exercises. Users view a series of images and provide descriptions, which can be useful for language development and communication assessment.

### Features

- **Image Gallery**: 12 pre-loaded images (numbered 1-12)
- **Navigation**: Move between images using Previous/Next buttons
- **Text Input**: Large text area for descriptions
- **Submit Function**: Send descriptions for processing

### Using Director

#### Viewing Images

1. **Access Director**: Click the "Director" card from the main menu
2. **View Current Image**: The current image is displayed prominently
3. **Navigate**:
   - Click **"Previous Image"** (←) to go to the previous image
   - Click **"Next Image"** (→) to go to the next image
   - Image numbers range from 1 to 12

#### Describing Images

1. **Observe the Image**: Take time to look at all details
2. **Type Description**: 
   - Click in the text area labeled "Describe what you see..."
   - Type a detailed description of the image
   - Include relevant details, actions, and context
3. **Submit**:
   - Click the **"Send"** button
   - You'll see a confirmation: "Description sent!"
   - The description is processed by the system

#### Best Practices

- **Be Detailed**: Include colors, positions, actions, and emotions
- **Use Complete Sentences**: Practice language skills through structured descriptions
- **Review**: Read your description before submitting
- **Compare**: Note how descriptions vary between images

### Educational Applications

The Director module can be used for:
- Language development exercises
- Vocabulary building
- Attention to detail practice
- Communication skills assessment
- Cognitive development activities

---

## Questioner and Picker

These modules are currently in development:

- **Questioner**: Will provide structured questionnaires
- **Picker**: Will offer selection-based assessments

Check for updates as these features become available.

---

## Troubleshooting

### Common Issues and Solutions

#### Image Upload Problems

**Issue: "File is too large. Maximum size is 5MB"**
- **Solution**: Compress the image using an image editor or online tool
- Resize the image to reduce file size
- Save in JPEG format with lower quality if needed

**Issue: "Invalid file type"**
- **Solution**: Ensure the file is JPG, PNG, or JPEG format
- Convert the file using an image editor if needed
- Check the file extension matches the actual file type

**Issue: Image preview not showing**
- **Solution**: 
  - Refresh the page and try again
  - Check that JavaScript is enabled in your browser
  - Try a different browser
  - Clear browser cache

#### Analysis Problems

**Issue: Analysis taking too long**
- **Solution**:
  - Wait at least 30-60 seconds before trying again
  - Check your internet connection
  - Ensure the backend server is running (check server status with administrator)
  - Try with a smaller image file

**Issue: "Request timeout" error**
- **Solution**:
  - Check your internet connection
  - Verify the backend server is running
  - Try submitting again
  - Contact support if the problem persists

**Issue: Analysis results not appearing**
- **Solution**:
  - Scroll down on the page (results appear below the form)
  - Refresh the page and check if results are cached
  - Try submitting the analysis again
  - Check browser console for errors (F12 key)

#### Drawing Tools Issues

**Issue: Brush not drawing**
- **Solution**:
  - Make sure you've selected the brush tool (not eraser)
  - Check that you're clicking and dragging (not just clicking)
  - Try refreshing the page
  - Clear browser cache

**Issue: Touch drawing not working (mobile)**
- **Solution**:
  - Ensure you're on a device that supports touch
  - Try using a stylus instead of finger
  - Check if other touch features work on your device
  - Try a different browser (Chrome recommended for mobile)

#### PDF Download Issues

**Issue: PDF not downloading**
- **Solution**:
  - Check your browser's download settings
  - Look in your Downloads folder
  - Check if a pop-up blocker is preventing the download
  - Try a different browser

**Issue: PDF appears empty or corrupted**
- **Solution**:
  - Try generating the PDF again
  - Ensure the analysis completed successfully before downloading
  - Check that you have enough storage space
  - Try a different browser

#### Language Issues

**Issue: Language not changing**
- **Solution**:
  - Refresh the page after changing language
  - Clear browser cache and cookies
  - Check that you've selected a valid language option
  - Try logging out and back in (if applicable)

**Issue: Text appears broken or with question marks**
- **Solution**:
  - Ensure your browser supports the selected language
  - Install language fonts if needed
  - Try a different browser
  - Switch to English temporarily

### Browser Compatibility

**Recommended Browsers**:
- Google Chrome (latest version) - **Recommended**
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version)

**Not Recommended**:
- Internet Explorer (not supported)
- Older browser versions (may have limited functionality)

### Getting Help

If you continue to experience issues:

1. **Check System Requirements**:
   - Ensure you have a stable internet connection
   - Verify you're using a supported browser
   - Check that JavaScript is enabled

2. **Clear Browser Data**:
   - Clear cache and cookies
   - Try in incognito/private mode
   - Disable browser extensions temporarily

3. **Contact Support**:
   - Note the specific error message
   - Record the steps that led to the issue
   - Include your browser and operating system information

---

## Best Practices

### For Drawing Analyzer

1. **Image Quality**:
   - Use clear, well-lit photos
   - Ensure the entire drawing is visible
   - Avoid shadows or glare
   - Use maximum resolution within file size limits

2. **Assessment Accuracy**:
   - Review the drawing carefully before answering questions
   - Reference the tooltips for guidance on each question
   - Be objective and observant
   - Consider multiple perspectives

3. **Documentation**:
   - Always download the PDF report
   - Save PDFs with descriptive filenames (include date and child identifier)
   - Maintain organized records
   - Follow your institution's documentation policies

4. **Professional Use**:
   - Remember that AI analysis is a tool, not a replacement for professional judgment
   - Combine AI insights with other assessment methods
   - Consider cultural and developmental context
   - Consult with qualified professionals for interpretation

### For Drawing Activities

1. **Free Drawing**:
   - Allow children creative freedom
   - Provide adequate time
   - Create a comfortable, non-judgmental environment
   - Save or screenshot completed drawings for records

2. **Guided Drawing**:
   - Let children choose elements at their own pace
   - Observe placement and organization patterns
   - Note emotional responses during the activity
   - Ask open-ended questions about their choices

### General Practices

1. **Privacy and Confidentiality**:
   - Ensure compliance with privacy regulations (HIPAA, GDPR, etc.)
   - Use secure connections (HTTPS)
   - Store downloaded PDFs securely
   - Follow your organization's data handling policies

2. **Age Appropriateness**:
   - Consider the child's developmental stage
   - Adjust expectations based on age
   - Use age-appropriate language when explaining activities

3. **Ethical Considerations**:
   - Obtain proper consent before using the application
   - Explain the purpose of activities clearly
   - Respect children's boundaries and comfort levels
   - Use results appropriately and responsibly

4. **Technical Maintenance**:
   - Keep the application updated
   - Regularly clear browser cache
   - Monitor available storage space
   - Back up important PDF reports

---

## Appendix

### Keyboard Shortcuts

Currently, the application primarily uses mouse/touch interactions. Keyboard shortcuts may be available for:
- **Tab**: Navigate between form elements
- **Enter**: Submit forms (where applicable)
- **Escape**: Close modals or cancel actions

### System Requirements

**Minimum Requirements**:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Stable internet connection
- Screen resolution: 1024x768 or higher

**Recommended**:
- High-speed internet connection
- Latest browser version
- Touch screen (for drawing features)
- Adequate device storage for PDF downloads

### Glossary

- **DAP Test**: Draw-A-Person test, a psychological assessment tool
- **HTP Test**: House-Tree-Person test, a projective psychological assessment
- **PDF**: Portable Document Format, used for downloadable reports
- **AI**: Artificial Intelligence, powers the drawing analysis
- **Vision Model**: AI model capable of analyzing images

---

## Version Information

**Last Updated**: 2025

**Application Version**: Current

**Supported Languages**: 11 languages

**Document Version**: 1.0

---

## Feedback and Updates

This user manual is maintained to reflect the current functionality of the Drawing Analysis App. As new features are added, this manual will be updated accordingly.

For questions, suggestions, or to report issues, please contact your system administrator or technical support team.

---

**End of User Manual**


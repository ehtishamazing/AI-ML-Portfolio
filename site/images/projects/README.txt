HOW TO REPLACE PROJECT PLACEHOLDER IMAGES
===========================================

Right now the 7 project tiles on the PROJECTS screen pull random stock
photos from picsum.photos so the layout looks complete. Each one is
clearly marked with a "PLACEHOLDER" tag in the corner.

To swap in your real screenshots:

1. Open index.html and find the <section id="projects"> block.
2. Each project tile looks like this:

   <article class="tile" data-project="smartpost">
     <span class="tile__placeholder-tag">PLACEHOLDER</span>
     <img src="https://picsum.photos/seed/smartpost-ehtisham/700/700" alt="...">
     ...
   </article>

3. Replace the src="" with your own image. Two options:

   OPTION A — use a local file (recommended):
   - Drop your screenshot into this /images/projects/ folder,
     e.g. images/projects/smartpost.jpg
   - Change the src to: src="images/projects/smartpost.jpg"

   OPTION B — link to an image hosted elsewhere:
   - Just paste the URL into src="..."

4. Once you've swapped the image, delete the line:
   <span class="tile__placeholder-tag">PLACEHOLDER</span>
   so the "PLACEHOLDER" badge disappears from that tile.

Project tiles, by data-project id:
- groqtalk      -> GroqTalk Pro
- braintumor    -> Brain Tumor Detection
- smartpost     -> SmartPost AI
- salesmachine  -> Autonomous Sales Machine
- sysspy        -> SysSpy
- hostel        -> Hostel Management System
- gasleak       -> Gas Leakage Detection

The two small thumbnails on the CONTACT screen (bottom right) reuse
the GroqTalk Pro and Brain Tumor Detection images — update those
src values too if you change those two projects' images.

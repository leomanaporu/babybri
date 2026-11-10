# 💖 5th Monthsary Romantic Web Page (Javacano Edition)

A romantic interactive anniversary website built with love for your girlfriend.

---

## 🌟 What's Included:

1. **Floating Hearts Atmosphere:** Soft animated hearts drifting gently on screen.
2. **Interactive Music Player:**
   - Tap the floating music pill in the corner to play/pause your special song.
   - Built with dual-audio support: plays your own `assets/music/music.mp3` file, or defaults to an ambient romantic melody synthesizer if no file is present!
3. **Live "Days Together" Counter:** Shows live days, hours, minutes, and seconds you've spent together.
4. **Wax-Sealed Love Letter:**
   - Click the wax seal to unfold a heartfelt love letter celebrating your 5 months together.
5. **Month 1 - Month 5 Story Timeline:**
   - Highlights your relationship milestones from day one up to month 5.
6. **Polaroid Photo Gallery:**
   - Aesthetic taped & pinned Polaroid cards with sweet captions and full-screen Lightbox view.
   - Includes an on-page **"Add / Change Photos"** button to load photos directly from your phone/computer.
7. **Video Memories Frame:**
   - A framed player for your couple clips and TikTok/Reels memories.
8. **Reasons Why I Fall For You:**
   - 6 interactive 3D flip cards revealing sweet reasons why you love her.
9. **Grand Finale Confetti Celebration:**
   - Click **"YES! Happy Monthsary!"** for a heart-and-sparkle confetti explosion!

---

## 📁 How to Add Your Own Media:

### 1. Photos
Place your couple photos in:
```text
Javacano/assets/images/photo1.jpg
Javacano/assets/images/photo2.jpg
Javacano/assets/images/photo3.jpg
Javacano/assets/images/photo4.jpg
```
*(You can also click the on-screen "📸 Add / Change Photos" button directly in your browser!)*

### 2. Music
Drop your favorite romantic song into:
```text
Javacano/assets/music/music.mp3
```
*(Or simply place `music.mp3` directly in the `Javacano/` folder).*

### 3. Video
Drop your favorite video clip into:
```text
Javacano/assets/videos/video1.mp4
```

---

## ✏️ How to Customize:

1. **Change the Start Date:**
   Open `script.js` and set your exact relationship start date at the top:
   ```javascript
   const startDate = new Date(2026, 5, 10); // Year, Month (0=Jan, 5=June), Day
   ```

2. **Personalize the Love Letter:**
   Open `index.html` and look for the `<div class="letter-body">` section to add your personal inside jokes, names, and memories!

3. **To Open:**
   Just double-click `index.html` to open it in Chrome, Edge, or any mobile browser!

# 🐞 Bug Report 1: Light Intensity Slider Is Not Responsive

### 📄 File: `basicSettings.js`

### 📍 Line: 52

### 🧪 Type: Logic Bug

### 🔍 Identified Using: Visual Regression Test

---

### 📝 Description

Adjusting the light intensity slider does not trigger any visible change in the light's status. Increasing intensity does not turn the light on.

---

### ✅ Expected Behavior

Moving the slider should increase or decrease the light intensity. If the light is off, increasing the intensity should turn it on automatically.

---

### ❌ Actual Behavior

The slider appears unresponsive — moving it does not change the light intensity or switch the light on.

---

### 🔁 Steps to Reproduce

1. Open any room component.
2. Move the light intensity slider.
3. Observe that the light does not turn on or change intensity.

---

### 🧾 Console Output

`componentData` is logged as `undefined`.

---

# 🐞 Bug Report 2: Room Light Switch (Bulb Icon) Is Unresponsive

### 📄 File: `basicSettings.js`

### 📍 Line: 105

### 🧪 Type: Logic Bug

### 🔍 Identified Using: Visual Regression Test

---

### 📝 Description

Clicking the light bulb icon (intended to act as a toggle) does not turn the room light on or off.

---

### ✅ Expected Behavior

Clicking the light bulb icon should toggle the room light between on and off states.

---

### ❌ Actual Behavior

Clicking the light bulb has no effect — the light remains off regardless of the current state.

---

### 🔁 Steps to Reproduce

1. Open any room component.
2. Click on the light bulb icon.
3. Observe that the light remains off.

---

### 🧾 Console Output

`componentData.isLightOn` is always `false`, even when the light intensity is greater than 0.

---

# 🐞 Bug Report 3: Preset Time Does Not Update After User Input

### 📄 File: `advanceSettings.js`

### 📍 Line: 166

### 🧪 Type: Logic Bug

### 🔍 Identified Using: Visual Regression Test

---

### 📝 Description

When users set a custom automatic on/off time in the advanced settings, the new time does not appear in the UI.

---

### ✅ Expected Behavior

After confirming the time input, the UI should display the updated automatic "on" and "off" schedule.

---

### ❌ Actual Behavior

The input value is accepted but not reflected in the UI — no visible change is shown.

---

### 🔁 Steps to Reproduce

1. Open any component with advanced features.
2. Click the edit icon for scheduling.
3. Set preferred "turn on" and "turn off" times and confirm.
4. Observe that the displayed time remains unchanged.

---

### 🧾 Console Output

The user’s input value is correctly logged, but the function seems to terminate immediately after setting the value, preventing further UI update.

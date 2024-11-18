![image](https://github.com/user-attachments/assets/87bcaabb-661d-4495-bf65-f54beeed4df9)

## ** Results**

![image](https://github.com/user-attachments/assets/5ed971a9-e561-4625-a572-bac6d2314128)

# How to Install ip-analyzer on macOS

This guide walks you through installing and setting up the **`ip-analyzer`** repository on your macOS system. Follow these steps to get started:

## **1. Prerequisites**

Make sure you have the following [Tines Story](https://www.tines.com/library/stories/87626/?name=analyze-an-ip-in-many-services-at-once&redirected-from=%2Flibrary%2Fstories%2F%3Fs%3Danalyze+ip) loaded in your Tenant or you can use that one on Demo

**NOTE** : If you don’t want to use Git you can just download the repo [here](https://github.com/seefor/ip-analyzer/archive/refs/heads/main.zip) 

Ensure the following tools are installed on your Mac:

**Git**: To clone the repository.

Install via Homebrew:

```bash
brew install git
```

## **2. Clone the Repository**

Clone the repository using Git:

```bash
git clone https://github.com/seefor/ip-analyzer.git
```

Navigate to the repository directory:

```bash
cd ip-analyzer
```

## **3. Install Dependencies**

Install the necessary dependencies using npm:

```bash
npm install
```

---

## **4. Now let’s add your Tenant WebHook**

We will need to edit the following file:

```bash
/src/components/IPForm.tsx
Edit line 48 where it states 'YOUR-TENANT-WEBHOOK' with your Tenant WebHook
Save the file
```

Make sure you save the file

## **5. Development Mode**

If you want to run the project in development mode, use the following:

```bash
npm run dev
```

There will be a “url” and port that will popup on the terminal you can hold down “CMD” and click to open the webpage.

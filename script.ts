// Declare html2pdf as any to avoid TypeScript errors
declare const html2pdf: any;

// Function to preview the profile picture
function previewProfilePicture(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profilePictureSrc = e.target?.result as string;
            const imgElement = document.createElement('img');
            imgElement.src = profilePictureSrc;
            imgElement.alt = "Profile Picture";
            imgElement.classList.add('profile-picture');
            const resumeDisplay = document.getElementById('resumeDisplay') as HTMLElement;
            resumeDisplay.innerHTML = ''; // Clear existing content
            resumeDisplay.appendChild(imgElement); // Add the profile picture
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Function to generate the resume
function generateResume(): void {
    console.log("Generate Resume function called");

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const profilePictureInput = (document.getElementById('profilePicture') as HTMLInputElement);
    const profilePictureFile = profilePictureInput.files?.[0];

    const reader = new FileReader();
    let profilePictureSrc = '';

    if (profilePictureFile) {
        reader.onload = function (e) {
            profilePictureSrc = e.target?.result as string;
            displayResume(name, email, phone, address, education, experience, skills, profilePictureSrc);
        };
        reader.readAsDataURL(profilePictureFile);
    } else {
        displayResume(name, email, phone, address, education, experience, skills);
    }
}

// Function to display the resume
function displayResume(name: string, email: string, phone: string, address: string, education: string, experience: string, skills: string, profilePictureSrc?: string): void {
    const resumeDisplay = document.getElementById('resumeDisplay') as HTMLElement;
    resumeDisplay.innerHTML = `
        <div class="resume-header">
            <h2>${name}</h2>
            ${profilePictureSrc ? `<img src="${profilePictureSrc}" alt="Profile Picture" class="profile-picture">` : ''}
        </div>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
    `;
}

// Function to download the resume as a PDF
function downloadPDF(): void {
    const element = document.getElementById('resumeDisplay') as HTMLElement;
    const options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    (html2pdf as any).set(options).from(element).save();
}

// Function to print the resume
function printResume(): void {
    const element = document.getElementById('resumeDisplay') as HTMLElement;
    const printWindow = window.open('', '_blank') as Window;
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Resume</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; }
                    .resume-header h2 { font-size: 24px; }
                    .profile-picture { width: 120px; height: 120px; border-radius: 50%; }
                </style>
            </head>
            <body>${element.innerHTML}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

'use server'

export const sendQuestion = async (question) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contents": [
            {
                "parts": [
                {
                    "text" : `You are a helpful assistant that answers the questions about Adrian de los Reyes asif you were him.\nSomre information about Adrian de los Reyes:\nSoftware Developer\nEMAIL: adriandelosreyes2013@gmail.com \nPHONE: +598 92833080 \nLOCATION: Flores, Uruguay\nSTATEMENT:I am a passionate full stack developer with a strong focus on backend development, dedicated to my ongoing professional growth. My love for coding is complemented by a fervent desire to make a significant contribution to the success of every project I engage with. My goal is to create a lasting impact, delivering robust and efficient solutions that drive business achievements. I am always eager to learn and enhance my skills, committed to continuous development, and delivering exceptional results in the world of software development.\nWORK EXPERIENCE:\nSoftware Developer\nBaufest · Full-time\nAug 2022 - Jul 2023 · 1 yr\nUruguay · Remote\nI spearheaded the development of full-stack applications using Java, Angular, and React, providing employees with an intuitive and high-performance interface. These applications streamlined project invoicing, enabling efficient estimation, generation of invoices, employee management, cost tracking, hours management, and billing validations, among other functionalities.\nSignificantly reduced manual task time for the internal team by automating the integration of processes between the Jira API and the database using Python. I achieved remarkable time savings, enabling employees to allocate more effort to critical tasks and strategic initiatives.\nEnhanced legacy C# code by adding new features and optimizing integration between SAP and the database, resulting in a cleaner codebase and essential functionalities tailored to the company'\''s needs.\nBack-end Developer\nGrupo ConsulTIC · Internship\nSep 2023 - Present · 6 mos\nMexico · Remote\nI play a vital role in developing the API Gateway for our\nlegal management systems This gateway serves as the\ncentral control point for coordinating microservices.\nDeveloping and enhancing the API Gateway to provide\nan efficient and intuitive platform for our legal team,\nfacilitating case management, document handling, and\ncommunication between microservices.\nOptimizing database integration to maintain an\nefficient codebase tailored to our specific\nrequirements\n\nEDUCATION:\nPolo Tecnológico \nHigh School, Informática\n2020 - 2023\nSpecializing in programming, database management, and operating systems. I gained expertise in various programming languages such as Java, JavaScript, and Python. I also developed a strong foundation in logical thinking and problem-solving. Additionally, my coursework involved practical application and projects that allowed me to apply my programming skills to real-world scenarios\n\n---\nQuestion: ${question} \nAnswer\n`
                }
                ]
            }
            ],
            "generationConfig": {
            "temperature": 0.9,
            "topK": 1,
            "topP": 1,
            "maxOutputTokens": 2048,
            "stopSequences": []
            },
            "safetySettings": [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
            ]
        })
    }).then((res => res.json()))

    const result = response.candidates[0].content.parts[0].text
    return result
}

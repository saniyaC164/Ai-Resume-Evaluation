#This file contains the resume evaluation logiv using NLP 

import spacy

nlp = spacy.load("en_core_web_md")

def evaluate_resume_text(resume_text):
    score = 0
    feedback = []

    resume_lower = resume_text.lower()

    if 'projects' in resume_lower:
        score += 1
    else:
        feedback.append("Consider adding a Projects section.")

    if 'skills' in resume_lower:
        score += 1
    else:
        feedback.append("Include a Skills section with technical keywords.")

    if 'education' in resume_lower:
        score += 1
    else:
        feedback.append("List your education background clearly.")

    return {
        "score": score,
        "feedback": feedback
    }

def match_resume_to_jd(resume_text, jd_text):
    resume_doc = nlp(resume_text)
    jd_doc = nlp(jd_text)
    similarity = resume_doc.similarity(jd_doc)
    
    return {
        "similarity_score": round(similarity * 100, 2),
        "verdict": "Good match" if similarity > 0.75 else "Needs improvement"
    }

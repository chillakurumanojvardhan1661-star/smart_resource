from ..config import settings

def enhance_docs(raw_doc):
    """
    Enhances the raw markdown documentation using OpenAI or a rule-based system.
    """
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            
            prompt = f"""
            Enhance the following technical documentation extracted from source code:
            
            {raw_doc}
            
            Please:
            1. Add a professional introduction.
            2. Clarify complex function/class purposes.
            3. Add hypothetical use cases for each major component.
            4. Suggest best practices for using this module.
            5. Ensure the tone is technical yet accessible.
            6. Keep the existing Markdown structure but make it more detailed.
            """
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1500
            )
            return response.choices[0].message.content
        except Exception as e:
            return _rule_based_enhancement(raw_doc) + f"\n\n> [!NOTE]\n> AI enhancement failed: {e}"
    else:
        return _rule_based_enhancement(raw_doc)

def _rule_based_enhancement(raw_doc):
    enhancement = "\n## 🧠 System Architecture Overview\n"
    enhancement += "This module is part of a distributed microservices architecture designed for high scalability and modularity. "
    enhancement += "It utilizes standard Python patterns for maintainability.\n\n"
    
    enhancement += "### 🛠️ Usage Patterns\n"
    enhancement += "- **Integration**: Import the relevant classes into your main application flow.\n"
    enhancement += "- **Configuration**: Ensure environment variables are correctly set as per the `config.py` definitions.\n\n"
    
    return raw_doc + enhancement

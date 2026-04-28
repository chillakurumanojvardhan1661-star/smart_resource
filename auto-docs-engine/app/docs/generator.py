from .parser import CodeParser
import os

class DocGenerator:
    def __init__(self):
        self.parser = CodeParser()

    def generate(self, file_path):
        parsed = self.parser.parse_file(file_path)
        file_name = os.path.basename(file_path)

        doc = f"# Technical Documentation: {file_name}\n\n"
        doc += f"Auto-generated from source code using AST parsing.\n\n"

        if parsed["classes"]:
            doc += "## Classes\n\n"
            for c in parsed["classes"]:
                doc += f"### Class: `{c['name']}`\n"
                doc += f"{c['doc'] or '*No class description provided.*'}\n\n"
                if c["methods"]:
                    doc += "#### Methods\n"
                    for m in c["methods"]:
                        doc += f"- **`{m['name']}`**: {m['doc'] or 'No description'}\n"
                    doc += "\n"

        if parsed["functions"]:
            doc += "## Functions\n\n"
            for f in parsed["functions"]:
                # Avoid listing methods again if they were in classes (simplified for now)
                doc += f"### Function: `{f['name']}({', '.join(f['args'])})`\n"
                doc += f"{f['doc'] or '*No function description provided.*'}\n\n"

        return doc

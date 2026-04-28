import ast
import os

class CodeParser:
    def parse_file(self, file_path):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
            
        with open(file_path, "r", encoding="utf-8") as f:
            tree = ast.parse(f.read())

        functions = []
        classes = []

        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                functions.append({
                    "name": node.name,
                    "doc": ast.get_docstring(node),
                    "args": [arg.arg for arg in node.args.args]
                })

            if isinstance(node, ast.ClassDef):
                methods = []
                for subnode in node.body:
                    if isinstance(subnode, ast.FunctionDef):
                        methods.append({
                            "name": subnode.name,
                            "doc": ast.get_docstring(subnode)
                        })
                classes.append({
                    "name": node.name,
                    "doc": ast.get_docstring(node),
                    "methods": methods
                })

        return {
            "functions": functions,
            "classes": classes
        }

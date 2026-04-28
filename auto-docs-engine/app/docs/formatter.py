import markdown

def to_html(md_text):
    # Basic HTML wrapper for the markdown
    content = markdown.markdown(md_text, extensions=['fenced_code', 'tables'])
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Auto-Generated Documentation</title>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 40px; color: #333; background: #f9f9f9; }}
            h1, h2, h3 {{ color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }}
            code {{ background: #eee; padding: 2px 5px; border-radius: 3px; font-family: monospace; }}
            pre {{ background: #2c3e50; color: #ecf0f1; padding: 15px; border-radius: 5px; overflow-x: auto; }}
            blockquote {{ border-left: 5px solid #3498db; margin: 0; padding-left: 15px; color: #7f8c8d; }}
        </style>
    </head>
    <body>
        {content}
    </body>
    </html>
    """
    return html

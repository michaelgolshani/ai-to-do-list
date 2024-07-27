from flask import Blueprint, jsonify
from openai import OpenAI  # type: ignore

test_routes = Blueprint('tests', __name__)

client = OpenAI()


@test_routes.route('/hello', methods = ["GET"] )
def api_test():
  """Create a route to test out the open api"""
  try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a to do app assistant"},
                {"role": "user", "content": "Create a to do list"}
            ]
        )

        print(completion.choices[0].message.content)
        response = completion.choices[0].message.content

        cleaned_up_response = response.replace('\n', ' ')

        return {"Response": f'{cleaned_up_response}'}, 200

  except Exception as e:
        return jsonify({"error": str(e)}), 500


@test_routes.route('/hardcode', methods = ["GET"])
def hardcoded_response():
     return {"Response": 'This is a test'}


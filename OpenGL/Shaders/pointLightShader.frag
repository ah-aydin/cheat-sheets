#version 400

out vec4 FragColor;

in vec2 TexCoords;
in vec3 Normal;
in vec3 FragPos;

uniform vec3 viewPos;

struct Material
{
    sampler2D diffuse;
    sampler2D specular;
    float shininess;
};

struct PointLight
{
    vec3 position;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;

    float constant;
    float linear;
    float quadratic;
};

uniform Material material;
uniform PointLight pointLight;

void main()
{
    float distance = length(pointLight.position - FragPos);
    float attenuation = 1.0 / (pointLight.constant + pointLight.linear * distance + pointLight.quadratic * distance);

    vec3 ambient = pointLight.ambient * vec3(texture(material.diffuse, TexCoords));

    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(pointLight.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = pointLight.diffuse * diff * vec3(texture(material.diffuse, TexCoords));

    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = pointLight.specular * spec * vec3(texture(material.specular, TexCoords));

    vec3 result = (ambient + diffuse + specular) * attenuation;

    FragColor = vec4(result, 1.0);
}
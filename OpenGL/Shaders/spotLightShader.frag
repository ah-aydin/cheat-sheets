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

struct SpotLight
{
    vec3 position;
    vec3 direction;
    float cutOff;
    float outerCutOff;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;

    float constant;
    float linear;
    float quadratic;
};

uniform Material material;
uniform SpotLight spotLight;

void main()
{
    // check if the fragment is in the spot light
    vec3 lightDir = normalize(spotLight.position - FragPos);
    float theta = dot(lightDir, normalize(-spotLight.direction));
    if (theta > spotLight.outerCutOff)
    {
        float distance = length(spotLight.position - FragPos);
        float attenuation = 1.0 / (spotLight.constant + spotLight.linear * distance + spotLight.quadratic * distance);

        vec3 ambient = spotLight.ambient * texture(material.diffuse, TexCoords).rgb;

        vec3 norm = normalize(Normal);
        vec3 lightDir = normalize(spotLight.position - FragPos);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = spotLight.diffuse * diff * texture(material.diffuse, TexCoords).rgb;

        vec3 viewDir = normalize(viewPos - FragPos);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
        vec3 specular = spotLight.specular * spec * texture(material.specular, TexCoords).rgb;

        vec3 result;
        
        if (theta > spotLight.cutOff) // inner cone
            result = (ambient + diffuse + specular) * attenuation;
        else // outer cone
        {
            float epsilon = spotLight.cutOff - spotLight.outerCutOff;
            float intensity = clamp((theta - spotLight.outerCutOff) / epsilon, 0.0, 1.0);
            result = (ambient + (diffuse + specular) * intensity) * attenuation;
        }
        FragColor = vec4(result, 1.0);
    }
    else
    {
        vec3 ambient = spotLight.ambient * texture(material.diffuse, TexCoords).rgb;
        FragColor = vec4(ambient, 1.0);
    }
}
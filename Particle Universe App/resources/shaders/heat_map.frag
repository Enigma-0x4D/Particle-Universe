#version 450 core

uniform sampler2D u_texture;
uniform sampler2D u_gradient;

out vec4 fragColor;

void main() {
	float val = texture2D(u_texture, gl_FragCoord.xy/textureSize(u_texture, 0)).r;
    fragColor = texture2D(u_gradient, vec2(smoothstep(0.0, 1.0, val), 0.0));
}
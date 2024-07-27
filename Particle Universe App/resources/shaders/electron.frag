#version 450 core

uniform sampler2D u_texture;
uniform float u_noiseSeed;
uniform float u_scale;

out vec4 fragColor;

vec2 random(vec2 st, float seed) {
    st = vec2( dot(st,vec2(127.1,311.7 + seed)),
               dot(st,vec2(269.5,183.3 + seed)) );
    return 2.0*fract(sin(st)*43758.5453123)-1.0;
}

float noise(vec2 st, float seed) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix(
	mix( dot(random(i, seed), f),
		 dot(random(i + vec2(1.0,0.0), seed), f - vec2(1.0,0.0)), u.x ),
	mix( dot(random(i + vec2(0.0,1.0), seed), f - vec2(0.0,1.0)),
		 dot(random(i + vec2(1.0,1.0), seed), f - vec2(1.0,1.0)), u.x ),
	u.y );
}

float noise2o(vec2 st, float seed) {
	return noise(st, seed)+noise(st + vec2(0.5, 0.5), seed + 0.5);
}

void main() {
	vec2 texSize = vec2(textureSize(u_texture,0));
	float texSizeRatio = texSize.y/texSize.x;
	vec2 shift = vec2(-0.0025 * texSizeRatio, 0.0025) * u_scale;	
	
	vec2 pxSize = 1.0 / vec2(textureSize(u_texture, 0));
	if (abs(shift.x) < pxSize.x) shift.x = pxSize.x * sign(shift.x);
	if (abs(shift.y) < pxSize.y) shift.y = pxSize.y * sign(shift.y);
	
	vec2 texCoord = gl_FragCoord.xy / textureSize(u_texture, 0);
	
	float val = texture2D(u_texture, texCoord - shift).r;
	float shadow = texture2D(u_texture, texCoord + shift).r;
	
    float noiseValue = (
			  noise2o(gl_FragCoord.xy * 0.3, u_noiseSeed) * 0.1
			+ noise2o(gl_FragCoord.xy * 0.09, u_noiseSeed + 2.0) * 0.1
			+ noise2o(gl_FragCoord.xy * 0.009, u_noiseSeed + 4.0) * 0.05
			) * 0.5;
	
	fragColor = vec4(val / (shadow * 0.5 + 1.0) - shadow * 0.5) * 1.5 + vec4(noiseValue, noiseValue, noiseValue, 1.0 /* noise intensity */) + 0.15;
}























#version 450 core

uniform sampler2D u_texture;
uniform float u_scale;
uniform vec2 u_blackHolePos;
uniform float u_radius;
uniform vec4 u_eventHorizonColor;

out vec4 fragColor;

void main() {
	vec2 texSize = vec2(textureSize(u_texture, 0));
	float dx = (gl_FragCoord.x - texSize.x*0.5)/u_scale - u_blackHolePos.x;
	float dy = (texSize.y*0.5 - gl_FragCoord.y)/u_scale - u_blackHolePos.y;
	
	float distSq = dx * dx + dy * dy;
	float dist = sqrt(distSq);
	
	const float maxDistance = 20.0;
	const float maxDistanceSq = maxDistance*maxDistance;
	float pull = max((maxDistanceSq/distSq*(u_radius*u_radius*u_radius) - u_radius) / (maxDistanceSq - 1.0), 0.0);
	
	vec2 acc = vec2(dx, -dy)/dist*pull*u_scale;
	fragColor = texture2D(u_texture, vec2(gl_FragCoord.xy - acc)/texSize);
	if (pull > dist) fragColor = fragColor * 1.0-u_eventHorizonColor.a + u_eventHorizonColor;	
}

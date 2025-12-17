precision mediump float;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;
uniform float uAspect;

vec3 iridescent(float t) {
    return vec3(
    0.6 + 0.35 * cos(6.2831 * (t + 0.00)),
    0.6 + 0.35 * cos(6.2831 * (t + 0.33)),
    0.6 + 0.35 * cos(6.2831 * (t + 0.67))
    );
}

float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
    + (c - a) * u.y * (1.0 - u.x)
    + (d - b) * u.x * u.y;
}

void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

    float PI = 3.1415926535;

    float d = (pow(abs(st.x), 0.3) + pow(abs(st.y), 0.3)) * 0.4;

//    float star = smoothstep(0.1, 0.2, d) ;

//    vec3 color = vec3(1.0, 1.0, 1.0);
    float t = 0.3;
    float px = 1.0 / uResolution.y;
    float aa = max(fwidth(d), px) * 2.0;

    float core = 1.0 - smoothstep(t - aa, t + aa, d);

//    float m = max(abs(st.x), abs(st.y));
//    float L = 0.7;
//    float clip = 1.0 - smoothstep(L, L + aa, m);

//    float outv = core * clip;
    gl_FragColor = vec4(vec3(core), core);

//    float p         = 0.25;
//    float manhattan = pow(abs(st.x), p) + pow(abs(st.y), p);
//    float radial    = length(st);
//
//    float k         = 0.0;
//    float d         = mix(radial, manhattan, k);
//
//    float inner = 1.25;
//    float outer = 1.3;
//
//    float star  = 1.0 - smoothstep(inner, outer, d);
//    vec3  base  = vec3(0.58, 0.34, 1.0);
//
//    vec2  t     = vec2(uTime * 0.12, -uTime * 0.09);
//    vec2 warp   = vec2(
//        noise(st * 2.0 + vec2(10.0, 0.0) + uTime * 0.05),
//        noise(st * 2.0 + vec2(0.0, 10.0) - uTime * 0.05)
//    );
//
//    float n     = noise(st * 1.6 + warp * 0.6 + t);
//    vec3  holo  = iridescent(n * 2.0);
//    float band  = smoothstep(0.2, 0.8, n);
//
//    vec3 fill = (base + holo * band * 0.55) * star;
//
//
//    gl_FragColor = vec4(fill, star);
}
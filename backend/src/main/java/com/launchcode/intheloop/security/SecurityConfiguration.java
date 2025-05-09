package com.launchcode.intheloop.security;
import org.springframework.security.oauth2.jwt.Jwt;

import com.launchcode.intheloop.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authorization.AuthorizationManagers;
import org.springframework.security.authorization.AuthorityAuthorizationManager;
import org.springframework.security.authorization.AuthenticatedAuthorizationManager;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth0-> auth0
                        .requestMatchers(
                                "/user/register",
                                "/user/login",
                                "/user/exists",
                                "/user/add",
                                "/user/details/**",
                                "/user/update-profile/**",
                                "/user/upload-photo"

                        ).permitAll()

                        .requestMatchers("/posts").access(AuthorizationManagers.anyOf(
                                AuthorityAuthorizationManager.hasAuthority("SCOPE_read:posts"),
                                AuthenticatedAuthorizationManager.authenticated()
                        ))
                        .requestMatchers("/posts/**").access(AuthorizationManagers.anyOf(
                                AuthorityAuthorizationManager.hasAuthority("SCOPE_write:posts"),
                                AuthorityAuthorizationManager.hasAuthority("SCOPE_create:posts"),
                                AuthorityAuthorizationManager.hasAuthority("SCOPE_update:posts"),
                                AuthorityAuthorizationManager.hasAuthority("SCOPE_delete:posts"),
                                AuthenticatedAuthorizationManager.authenticated()
                        ))
                        .requestMatchers("/user/{id}/profile", "/user/details/**", "/user/{id}", "/user/all").access(
                                AuthorizationManagers.anyOf(
                                        AuthorityAuthorizationManager.hasAuthority("SCOPE_read:profile"),
                                        AuthenticatedAuthorizationManager.authenticated()
                                )
                        )
                        .requestMatchers("/user/update-profile/**", "/user/{id}").access(
                                AuthorizationManagers.anyOf(
                                        AuthorityAuthorizationManager.hasAuthority("SCOPE_update:profile"),
                                        AuthenticatedAuthorizationManager.authenticated()
                                )
                        )
                        .requestMatchers("/user/upload-photo").access(
                                AuthorizationManagers.anyOf(
                                        AuthorityAuthorizationManager.hasAuthority("SCOPE_upload:photo"),
                                        AuthenticatedAuthorizationManager.authenticated()
                                )
                        )


                        .anyRequest().authenticated()
                ).sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .securityContext(securityContext -> securityContext
                        .requireExplicitSave(false)
                )
                .logout(logout -> logout
                    .logoutUrl("/user/logout")
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.setStatus(HttpServletResponse.SC_OK);
                })
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
        )
                .userDetailsService(customUserDetailsService)
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                );
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthorityPrefix("SCOPE_");
        grantedAuthoritiesConverter.setAuthoritiesClaimName("permissions");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return converter;
    }
}

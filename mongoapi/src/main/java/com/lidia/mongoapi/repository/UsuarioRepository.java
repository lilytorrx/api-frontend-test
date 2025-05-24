package com.lidia.mongoapi.repository;

import com.lidia.mongoapi.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.domain.Pageable;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Page<Usuario> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}

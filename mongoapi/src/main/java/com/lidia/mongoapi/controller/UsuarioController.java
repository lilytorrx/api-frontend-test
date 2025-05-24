package com.lidia.mongoapi.controller;

import com.lidia.mongoapi.model.Usuario;
import com.lidia.mongoapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listAll() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario create(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/{id}")
    public Optional<Usuario> listById(@PathVariable String id) {
        return usuarioRepository.findById(id);
    }

    @PatchMapping("/{id}/habilidades")
    public Usuario addAbility(@PathVariable String id, @RequestBody List<String> habilidades){
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if(optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            usuario.setHabilidades(habilidades);
            return usuarioRepository.save(usuario);
        }
        return null;
    }
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable String id, @RequestBody Usuario novoUsuario) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(novoUsuario.getNome());
            usuario.setAtivo(novoUsuario.isAtivo());
            usuario.setHabilidades(novoUsuario.getHabilidades());
            usuario.setIdade(novoUsuario.getIdade());
            Usuario atualizado = usuarioRepository.save(usuario);
            return ResponseEntity.ok(atualizado);
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable String id) {
        if(usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public Page<Usuario> searchByName(@RequestParam String nome, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return usuarioRepository.findByNomeContainingIgnoreCase(nome, pageable);
    }
}

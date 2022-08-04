export function Dgraph7c94cd() {
  const graph = {
    "nodes":[],
    "links":[]
  }
  const files = app.vault.getMarkdownFiles()
  const map = maping() 
  for (let i = 0; i < files.length; i++) {
  const source = files[i].basename
  const path = files[i].path
  graph.nodes.push({"id": source,"group": 1,"path": path})
  const caches = this.app.metadataCache.getCache(path)
  if (("links" in caches)) {
      const link = caches.links
      const embed = caches.embeds
      if (!!link) {
      for (let j = 0; j < link.length; j++) {
          const links = link[j].link;
          if (map.has(links)) {
              graph.links.push({"source": source,"target": links,"value": 1})
      }
      }
      }
      if (!!embed) {
      for (let k = 0; k < embed.length; k++) {
          const id = embed[k].link
          if (id.indexOf("#")!=-1) {
              const sharp = id.indexOf("#");
              const embeds = id.substring(0,sharp);
              if (map.has(embeds)) {
              graph.links.push({"source": source,"target": embeds,"value": 1})
          }
          } else {
              const embeds = id
              if (map.has(embeds)) {
              graph.links.push({"source": source,"target": embeds,"value": 1})
          }
          }
      }
      }   
  }
  }
  // console.log(graph)
    return graph

  function maping() {
    const map = new Map()
    for (let i = 0; i < files.length; i++) {
      const source = files[i].basename
      map.set(source, "i")
    }
    return map
  }
}
